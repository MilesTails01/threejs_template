//import { GUI } from '/node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { GUI } from '/node_modules/dat.gui/build/dat.gui.module.js';

function fullscreen(mode)
{
	var elem = document.documentElement;
	if( mode)	
	{
		//		document.documentElement.requestFullscreen();
		/**/ if (elem.requestFullscreen) 		{	elem.requestFullscreen();			} 
		else if (elem.mozRequestFullScreen) 	{	elem.mozRequestFullScreen();		} 
		else if (elem.webkitRequestFullscreen)	{	elem.webkitRequestFullscreen();		} 
		else if (elem.msRequestFullscreen)		{	elem.msRequestFullscreen();			}	
	}
	if(!mode)	
	{
		//		document.documentElement.exitFullscreen();
		/**/ if (document.exitFullscreen) 		{	document.exitFullscreen();			} 
		else if (document.mozCancelFullScreen) 	{ 	document.mozCancelFullScreen();		} 
		else if (document.webkitExitFullscreen) {	document.webkitExitFullscreen();	} 
		else if (document.msExitFullscreen) 	{	document.msExitFullscreen();		}	
	}
}

var gui = new GUI({hideable: false});
	gui.domElement.style.position 	= "absolute";
	gui.domElement.style.left 		= "100px";


const f_player		= gui.addFolder("player");
const f_camera		= gui.addFolder("camera");
const f_light		= gui.addFolder("light");
const f_common		= gui.addFolder("common");

f_player.add(OPTIONS, "PLAYER_FORWARD_SPEED_MAX")	.min(0).max(2).step(0.01);
f_player.add(OPTIONS, "PLAYER_BACKWARD_SPEED_MAX")	.min(0).max(2).step(0.01);
f_player.add(OPTIONS, "PLAYER_STRAFE_SPEED_MAX")	.min(0).max(2).step(0.01);
f_player.add(OPTIONS, "PLAYER_DESCENT_SPEED_MAX")	.min(0).max(2).step(0.01);
f_player.add(OPTIONS, "PLAYER_FORWARD_ACCEL")		.min(0).max(1).step(0.01);
f_player.add(OPTIONS, "PLAYER_TURN_RATE_X")			.min(0).max(2000).step(1);
f_player.add(OPTIONS, "PLAYER_TURN_RATE_Y")			.min(0).max(2000).step(1);
f_player.add(OPTIONS, "PLAYER_COLLISION_RADIUS")	.min(0.1).max(5).step(0.1);
f_player.add(OPTIONS, "PLAYER_MODE_LIMIT")			.min(0).max(12).step(1);
f_player.add(OPTIONS, "PLAYER_FK_VALUE_H")			.min(-0.5).max(0.5).step(0.1);
f_player.add(OPTIONS, "PLAYER_FK_VALUE_V")			.min(-0.5).max(0.5).step(0.1);

f_player.close()


f_camera.add(OPTIONS, "FOV")						.min(0).max(120).step(1).onChange( 		function(){	camera.updateProjectionMatrix ();	});
f_camera.add(OPTIONS, "FOCAL")						.min(0).max(200).step(1).onChange( 		function(){	camera.updateProjectionMatrix ();	});
f_camera.add(OPTIONS, "ASPECT")						.min(0).max(3).step(0.1).onChange( 		function(){	camera.updateProjectionMatrix ();	});
f_camera.add(OPTIONS, "FAR")						.min(0).max(500).step(1).onChange(	 	function(){	camera.updateProjectionMatrix ();	});
f_camera.add(OPTIONS, "NEAR")						.min(0).max(100).step(0.1).onChange( 	function(){	camera.updateProjectionMatrix ();	});
f_camera.add(OPTIONS, "CAMERA_TILT_MIN")			.min(-2 * Math.PI).max(2 * Math.PI).step(0.1);
f_camera.add(OPTIONS, "CAMERA_TILT_MAX")			.min(-2 * Math.PI).max(2 * Math.PI).step(0.1);
f_camera.add(OPTIONS, "CAMERA_STIFFNESS")			.min(0).max(1).step(0.01);
f_camera.add(OPTIONS, "CAMERA_ANGLE")				.min(0).max(360).step(1);
f_camera.add(OPTIONS, "CAMERA_OFFSET_X")			.min(-10).max(10).step(0.01);
f_camera.add(OPTIONS, "CAMERA_OFFSET_Y")			.min(-10).max(10).step(0.01);
f_camera.add(OPTIONS, "CAMERA_OFFSET_Z")			.min(-10).max(10).step(0.01);
f_camera.add(OPTIONS, "CAMERA_LOOKAT_X")			.min(-10).max(10).step(0.01);
f_camera.add(OPTIONS, "CAMERA_LOOKAT_Y")			.min(-10).max(10).step(0.01);
f_camera.add(OPTIONS, "CAMERA_LOOKAT_Z")			.min(-10).max(10).step(0.01);
f_camera.add(OPTIONS, "CAMERA_TURN_DAMP")			.min(-1000).max(1000).step(1);
f_camera.close();

f_light.add(OPTIONS, "SHADOW_BIAS")					.min(-1).max(1).step(.00001)	.onChange(function(){	weather._updateCamera();	});
f_light.add(OPTIONS, "SHADOW_MAP_SIZE")				.min(64).max(8192).step(1)		.onChange(function(){	weather.light.shadow.map.dispose();
																											weather.light.shadow.map = null;
																											weather._updateCamera();	});
f_light.add(OPTIONS, "SHADOW_TOP")					.min(0).max(1000).step(1)		.onChange(function(){	weather._updateCamera();	});
f_light.add(OPTIONS, "SHADOW_BOTTOM")				.min(0).max(1000).step(1)		.onChange(function(){	weather._updateCamera();	});
f_light.add(OPTIONS, "SHADOW_LEFT")					.min(0).max(1000).step(1)		.onChange(function(){	weather._updateCamera();	});
f_light.add(OPTIONS, "SHADOW_RIGHT")				.min(0).max(1000).step(1)		.onChange(function(){	weather._updateCamera();	});
f_light.add(OPTIONS, "LIGHT_INTENSITY")				.min(0).max(10).step(.1)		.onChange(function(){	weather._updateCamera();	});
f_light.add(OPTIONS, "SHADOW_NEAR")					.min(0).max(10).step(.1)		.onChange(function(){	weather._updateCamera();	});
f_light.add(OPTIONS, "SHADOW_FAR")					.min(100).max(10000).step(1)	.onChange(function(){	weather._updateCamera();	});
f_light.add(OPTIONS, "SHADOW_ZOOM")					.min(0).max(10).step(.1)		.onChange(function(){	weather._updateCamera();	});
f_light.addColor(	OPTIONS, "AMBIENT");
f_light.addColor(	OPTIONS, "SKY");
f_light.addColor(	OPTIONS, "FOG");
f_light.add(		OPTIONS, "FOG_NEAR")			.min(0).max(100).step(.1)		.onChange(function(){	weather.fog.near 	= OPTIONS.FOG_NEAR;	});
f_light.add(		OPTIONS, "FOG_FAR")				.min(0).max(100).step(.1)		.onChange(function(){	weather.fog.far 	= OPTIONS.FOG_FAR;	});
f_light.close();

f_common.add(OPTIONS, "GRAVITY")						.min(-1).max(1).step(0.01);
f_common.add(OPTIONS, "FPS")							.min(1).max(120).step(1);
f_common.add(OPTIONS, "PLAYER_SHOW_GRID")				.onChange( function() { gridHelper.visible = OPTIONS.PLAYER_SHOW_GRID; });
f_common.add(OPTIONS, "DEBUGMODE")						.onChange( function() {  });
f_common.add(OPTIONS, "FULLSCREEN")						.onChange( function() { fullscreen(OPTIONS.FULLSCREEN); onWindowResize(); });
f_common.add(OPTIONS, "TOUCH_EMULATE")					.onChange( function() {	for(ele of document.getElementsByClassName("touch_analogue_base")) 
																				ele.style.display = (isTouchDevice() || OPTIONS.TOUCH_EMULATE) ? 'block' : 'none'; });

f_common.close();

gui.width 	= 400;
gui.close();