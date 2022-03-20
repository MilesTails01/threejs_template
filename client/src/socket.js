var socket = io();

socket.on('fork', function(data)
{
	let UUID	= data.client_id;
	console.log("PLAYER " + UUID + " CONNECTED");	
	main();
});

//	example 
socket.on('player_synchronize', function(data)
{
	let id		 = data.id;				
	let pos		 = new THREE.Vector3( data.px, data.py, data.pz );
	let rot		 = new THREE.Vector3( data.rx, data.ry, data.rz );
	let	wgt		 = data.wt;
	let evt		 = data.ev == "" ? false : data.ev;
	
	if(!UUID_LIST.includes(id) && id != UUID )
	{	
		ENTITIES[id]	=	new Character({	initPosition : 	new THREE.Vector3(0,0,0),
											initScale:		new THREE.Vector3(1,1,1),
											uuid:			id,		
											parent:			scene,
											player:			false,
											file:			ASSETS.DEFAULT_PLAYER});
		UUID_LIST.push(id)
	}
	
	if( UUID_LIST.includes(id) && id != UUID &&  ENTITIES[id].loaded ) 	{			ENTITIES[id].synch_pos( pos );	
																					ENTITIES[id].synch_rot( rot );	
																					ENTITIES[id].synch_wgt( wgt );	
																			if(evt) ENTITIES[id][evt]();			
																		}
});

socket.on('custom_disconnect', function(data)
{	
	console.log("PLAYER " + data + " DISCONNECTED");
});

/*
socket.on(	'event_name', function(recieved_data){...})
socket.emit('event_name', {})
*/
