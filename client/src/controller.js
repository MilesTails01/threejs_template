window.addEventListener('keydown',	function(e){	keyState[e.keyCode || e.which] = true;	},true);
window.addEventListener('keyup',	function(e){    keyState[e.keyCode || e.which] = false;	},true);
window.addEventListener('resize',	function(e){	onWindowResize()						},false );
const mouse 	= new THREE.Vector2();

function onMouseMove( e ) 
{
	mouse.x =	( e.clientX / window.innerWidth )	* 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight )	* 2 + 1;
//	PLAYER.turnEntity( e );
	calcMouse(e);
}

function onMouseDown( e )
{
	MOUSE_DOWN = true;	
	onMouseHold( e );	
}

function onMouseUp( e )
{
	MOUSE_DOWN = false;	
}

function onMouseHold( e )	// map on
{
//	PLAYER.fire( e );
	if(MOUSE_DOWN) setTimeout(onMouseHold, 1000 / OPTIONS.FIRE_RATE);
}
	
function calcMouse(e)
{
	mouse.x =	( e.clientX / SCREEN_WIDTH 	) * 2 - 1;
	mouse.y = - ( e.clientY / SCREEN_HEIGHT	) * 2 + 1;
}