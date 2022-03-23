const 	SPHERE_VELOCITY		= 2,
		LINEAR_VELOCITY		= 1,
		BULLET_TYPE_SHOCK	= 0,
		BULLET_TYPE_ROCKET	= 1,
		BULLET_TPYE_LASER	= 2,
		ITEM_TYPE_HEALTH	= 1,
		ITEM_TYPE_AMMO		= 2,
		CAMERA_LERP_SPEED	= 0.1,
		KEY_W 				= 87,
		KEY_S 				= 83,
		KEY_D 				= 68,
		KEY_A 				= 65, 
		KEY_CUU 			= 38,
		KEY_CUD 			= 40,
		KEY_CUL 			= 37,
		KEY_CUR 			= 39,
		KEY_ENTER 			= 13,
		KEY_SHIFT			= 16,
		KEY_E 				= 69,
		KEY_F 				= 70,
		KEY_G 				= 71,
		KEY_H 				= 72,
		KEY_J 				= 74,
		KEY_K 				= 75,
		KEY_SPACE			= 32,
		KEY_C				= 67,
		SCREEN_WIDTH		= 768,
		SCREEN_HEIGHT		= 768;

var		OPTIONS = {

		PLAYER_TURN_RATE_X			: 700,
		PLAYER_TURN_RATE_Y			: 700,
		PLAYER_FORWARD_SPEED_MAX	: 0.02,
		PLAYER_BACKWARD_SPEED_MAX	: 0.02,
		PLAYER_STRAFE_SPEED_MAX		: 0.02,
		PLAYER_DESCENT_SPEED_MAX	: 0.02,
		PLAYER_FORWARD_SPEED_MAX_R	: 0.06,
		PLAYER_BACKWARD_SPEED_MAX_R	: 0.06,
		PLAYER_STRAFE_SPEED_MAX_R	: 0.06,
		PLAYER_DESCENT_SPEED_MAX_R	: 0.06,
		PLAYER_FORWARD_ACCEL		: 0.5,
		PLAYER_BACKWARD_ACCEL		: 0.5,
		PLAYER_STRAFE_ACCEL			: 0.5,
		PLAYER_DESCENT_ACCEL		: 0.5,		
		PLAYER_ROLL_BACK_SPEED		: 0.2,
		PLAYER_ROLL_TO_SPEED		: 0.1,
		PLAYER_FORWARD_DEACCEL		: 0.3,
		PLAYER_BACKWARD_DEACCEL		: 0.3,
		PLAYER_STRAFE_DEACCEL		: 0.3,
		PLAYER_DESCENT_DEACCEL		: 0.3,			
		PLAYER_COLLISION_RADIUS		: 1,
		PLAYER_COLLISION_RADIUS_C	: 0.35,
		PLAYER_CAMERA_ROTATION_LAG	: 0.15,
		PLAYER_SHOW_GRID			: true,
		PLAYER_MODE_LIMIT			: 8,
		PLAYER_FK_VALUE_H			: 0,
		PLAYER_FK_VALUE_V			: 0,
		
		HF							: 3000,
		HF_GAIN						: 12,
		LF							: 3000,
		LF_GAIN						: 12,
		LF_HF_LERP					: 0.1,
		LF_HF_BOOST					: 3,
		
		CAMERA_TILT_MIN				: -0.5,
		CAMERA_TILT_MAX				:  0.5,
		CAMERA_STIFFNESS			: 0.7,
		CAMERA_DISTANCE				: 4.5,
		CAMERA_HEIGHT				: 2,
		CAMERA_TILT					: 355,
		
		CAMERA_OFFSET_X				: 0.4,
		CAMERA_OFFSET_Y				: 2.3,
		CAMERA_OFFSET_Z				: -3.5,
		CAMERA_LOOKAT_X				: 0.0,
		CAMERA_LOOKAT_Y				: 0.0,
		CAMERA_LOOKAT_Z				: 1.0,
		
		CAMERA_OFFSET_X_DEF			: 0.4,
		CAMERA_OFFSET_Y_DEF			: 2.3,
		CAMERA_OFFSET_Z_DEF			: -3.5,
		CAMERA_LOOKAT_X_DEF			: 0.0,
		CAMERA_LOOKAT_Y_DEF			: 0.0,
		CAMERA_LOOKAT_Z_DEF			: 1.0,
		
		CAMERA_OFFSET_X_AIM			: -1.2,
		CAMERA_OFFSET_Y_AIM			: 1.5,
		CAMERA_OFFSET_Z_AIM			: -2.0,
		CAMERA_LOOKAT_X_AIM			: 0.0,
		CAMERA_LOOKAT_Y_AIM			: 0.0,
		CAMERA_LOOKAT_Z_AIM			: 1.8,
		
		CAMERA_OFFSET_X_BOAT		: 0.4,
		CAMERA_OFFSET_Y_BOAT		: 2.3,
		CAMERA_OFFSET_Z_BOAT		: -8,
		CAMERA_LOOKAT_X_BOAT		: 0.0,
		CAMERA_LOOKAT_Y_BOAT		: 0.0,
		CAMERA_LOOKAT_Z_BOAT		: 1.0,
		
		CAMERA_TURN_DAMP			: -700,
		CAMERA_ANGLE				: 125,
		
		SHADOW_BIAS					: -0.0001,
		SHADOW_MAP_SIZE				: 4096,
		SHADOW_NEAR					: 0.5,
		SHADOW_FAR					: 500,
		SHADOW_ZOOM					: 1,
		SHADOW_LEFT					: 40,
		SHADOW_RIGHT				: 40,
		SHADOW_TOP					: 40,
		SHADOW_BOTTOM				: 40,
		LIGHT_INTENSITY				: 1,
		
		FPS							: 60,
		FIRE_RATE					: 5,
		FOCAL						: 35,
		FOV							: 75,
		FOV_DEF						: 75,
		FOV_AIM						: 65,
		
		ASPECT						: window.innerWidth / window.innerHeight,
		NEAR						: 0.1,
		FAR							: 500,
		BULLET_001_SPEED			: 2,
		LEVEL_ROT_X					: 0,
		LEVEL_ROT_Y					: 0,
		LEVEL_ROT_Z					: 0,
		TOUCH_EMULATE				: false,
		FULLSCREEN					: false,
		DEBUGMODE					: true,
		GRAVITY						: 0.15,
		SEA_LEVEL					: 0.01,
		AMBIENT						: {r: 255, g: 255, b: 255},
		SKY							: {r: 146, g: 206, b: 240},
		FOG							: 0x59cfff,
		FOG_NEAR					: 1,
		FOG_FAR						: 100,
		FOG_DENSITY					: 1	
};

var 	MANAGER			 			= new THREE.LoadingManager();		
var		ASSET_CACHE					= {};
var		TEXTURE_CACHE				= {};
var		ASSETS = {
		//	LEVEL:						"./assets/level.glb",
			DEFAULT_BOX:				"./assets/box.glb"
		},		
		TEXTURES = 
		{
		};
		
var		UUID,
		PLAYER					= new THREE.Object3D(),
		LEVEL					= new THREE.Object3D(),
		FOG,
		UUID_LIST				= [],
		ITEMS					= [],
		TRIGGER					= [],
		FIELDS					= [],
		ANIMALS					= [],
		PH_OBJECTS				= [],		
		STALLS					= [],
		STALL_LIST				= {},
		ENTITIES				= {},
		BULLET_LIST				= {},
		MOUSE_DOWN				= false,
		Type 					= { "CUBE":1, "SPHERE":2 },
		BULLET_SETTINGS			= {},
		ITEM_SETTINGS			= {},
	//	TOUCH_CONTROLS			= new TouchControls();
		keyState 				= {};
		
var 	now, then, elapsed;
var		camera;
var		controls;
var		COLLIDER				= {};
var 	stats 					= new Stats();
var 	scene					= new THREE.Scene();
const	axesHelper 				= new THREE.AxesHelper( 5 );
const 	loader 					= new THREE.GLTFLoader();
const 	renderer 				= new THREE.WebGLRenderer();
const	gridHelper 				= new THREE.GridHelper( 400, 400 );
const	temp					= new THREE.Vector3( 0, 0, 0 );
const	target					= new THREE.Vector3( 0, 0, 0 );
const	listener 				= new THREE.AudioListener();
//const	worldOctree 			= new Octree();