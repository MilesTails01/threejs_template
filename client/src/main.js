function pre_caching()
{	
	THREE.Cache.enabled 	= true;
	renderer._microCache 	= new MicroCache();
		MANAGER.onLoad 		= function ( ) 								
		{	
			bar				= document.getElementById("bar");
			scr				= document.getElementById("screen");
			bar.style.width = "100%";
			scr.classList.add("noscreen");
		//	setTimeout( function(){ while(scr.firstChild){scr.removeChild(scr.lastChild);} scr.parentNode.removeChild(scr); }, 1000);
			init();
		};
		MANAGER.onProgress 	= function ( url, itemsLoaded, itemsTotal ) 
		{	
			let p 			= itemsLoaded / itemsTotal * 100; 	
			bar				= document.getElementById("bar");
			lbl				= document.getElementById("bar_label");
			bar.style.width = Math.round(p) + "%";
			lbl.innerHTML	= Math.round(p) + "%";
		};
		MANAGER.onError 	= function ( url ) 							{	console.log( 'There was an error loading ' + url );	};
	
	var		tloader			= new THREE.TextureLoader(MANAGER);
	for(index in TEXTURES) 
	{
		let key = TEXTURES[index];
		tloader.load(key, (tex) => 
		{
			TEXTURE_CACHE[key] = tex;	
			console.log("TEXTURE: " + key);
			renderer._microCache.set(key, tex);
		});	
	}

	var 	loader			= new THREE.GLTFLoader(MANAGER);
	for(index in ASSETS) 
	{	
		let key = ASSETS[index];
		loader.load(key, (gltf) => 
		{	
			ASSET_CACHE[key] = gltf.scene;	
			console.log("MODEL: " + key);
			renderer._microCache.set(key, gltf.scene);
			
		//	if(key == "./assets/level.glb")
		//	worldOctree.fromGraphNode( gltf.scene );		
		});	
	}	
}

function main()
{
	pre_caching();	
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function renderer_init()
{
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( OPTIONS.SKY, 1);
	renderer.outputEncoding = THREE.sRGBEncoding;	
	document.body.appendChild( renderer.domElement );
	renderer.render( scene, camera );
	canvas 						= renderer.domElement;
	canvas.requestPointerLock	= canvas.requestPointerLock || canvas.mozRequestPointerLock;
	document.exitPointerLock	= document.exitPointerLock	|| document.mozExitPointerLock;
	canvas.onclick 				= function() 
	{ 
		canvas.requestPointerLock();		
	};
	
	document.addEventListener('pointerlockchange', 		lockChangeAlert, false);
	document.addEventListener('mozpointerlockchange', 	lockChangeAlert, false);
	
	function lockChangeAlert() 
	{
		if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) 
		{
			document.addEventListener(		"mousemove", 	onMouseMove, 		false);
			document.addEventListener(		"mousedown", 	onMouseDown, 		false);
			document.addEventListener(		"mouseup", 		onMouseUp, 			false);
		//	document.addEventListener(		"wheel", 		onMouseWheel, 		false);
			
		}
		else
		{
			document.removeEventListener(	"mousemove", 	onMouseMove, 		false);
			document.removeEventListener(	"mousedown", 	onMouseDown, 		false);
			document.removeEventListener(	"mouseup", 		onMouseUp, 			false);
		//	document.addEventListener(		"wheel", 		onMouseWheel, 		false);
		}
	}	
	
}

function level_init()
{
	LEVEL			= ASSETS["LEVEL"] ? renderer._microCache.get(ASSETS["LEVEL"]).clone() : new THREE.Object3D();
	scene.add(		LEVEL);	
}

function light_init()
{
	//	const ambient 			= new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
	//	const light 			= new THREE.DirectionalLight(0xFFFFFF, 1);	
	//	light.position.set(5, 10, 2);
	//	scene.add( light );
	//	scene.add( light.target );
	//	scene.add( ambient		);
}

function player_init()
{
//	console.log("PLAYER CREATED");
//	ENTITIES[UUID]	=	new Character({	initPosition : 	new THREE.Vector3(0,1,0),
//										initScale:		new THREE.Vector3(0.75,0.75,0.75),
//										uuid:			UUID,		
//										parent:			scene,
//										player:			(!PLAYER) ? true : false,
//										file:			ASSETS.DEFAULT_PLAYER})
}

function helper_init()
{
	axesHelper.position.y	= 0.001;
	scene.add( gridHelper	);
	scene.add( axesHelper	);
}

function camera_init()
{
	camera 					= new THREE.PerspectiveCamera( OPTIONS.FAR, OPTIONS.ASPECT, OPTIONS.NEAR, OPTIONS.FAR );
	camera.aspect 			= window.innerWidth / window.innerHeight;
	camera.fov 				= OPTIONS.FOV;
	camera.position.set( 2,2,2 );
	camera.lookAt(new THREE.Vector3());
	camera.add( listener );
	camera.updateProjectionMatrix();
}

function stats_init()
{
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom	
	document.body.appendChild( stats.dom );
	then 	= Date.now();
	now 	= then;
}

function touch_init()
{
	var L = new JoystickController("stickL", 64, 8);
	var R = new JoystickController("stickR", 128, 8);
	for(ele of document.getElementsByClassName("touch_analogue_base")) 
		ele.style.display = (isTouchDevice() || OPTIONS.TOUCH_EMULATE) ? 'block' : 'none';	
}

function animate() 
{
    requestAnimationFrame(animate);

    now 	= Date.now();
    elapsed = now - then;

    if (elapsed > (1000 / OPTIONS.FPS)) 
	{
        then = now - (elapsed % (1000 / OPTIONS.FPS));
		
		if(PLAYER) 
		{
			PLAYER.update();
		}
					
		renderer.render( scene, camera );	
		stats.update();
	}
}


function init()
{	
	stats_init();
	camera_init();
	light_init();
	helper_init();
	renderer_init();
	player_init();
	level_init();
	touch_init();
	animate();
}

main();