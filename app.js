function unique_id()	
{	
	return Math.random().toString(36).substr(2, 9);	
}

var path		= require('path');
var express		= require('express');
var app 		= express();
var port 		= 7000;
var srv			= require('http').Server(app);
var io 			= require('socket.io')(srv, {});
var SOCKET_LIST = {};

app.get('/', (req, res) => 
{
	res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static(__dirname + '/client'));

srv.listen(port);
console.log("host running on 7000...");

function send_data_all(reciever_event_name, data)
{
	for(var index in SOCKET_LIST)
	{
		var socket = SOCKET_LIST[index];
		socket.emit(reciever_event_name, data);
	}	
}

io.sockets.on('connection', function(socket)
{
	socket.id 				= unique_id();
	SOCKET_LIST[socket.id] 	= socket;
	socket.emit(	'fork',									{	client_id: socket.id								});
	socket.on(		'player_replicate',		function(data)	{	send_data_all('player_synchronize', 	data		);	});
	socket.on(		'disconnect',			function()		{	send_data_all('custom_disconnect', 		socket.id	);	});
	socket.on(		'message_replicate',	function(data)	{	send_data_all('message_synchronize',	data		);	});
});