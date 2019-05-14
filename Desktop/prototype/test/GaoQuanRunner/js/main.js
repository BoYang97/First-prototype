'use strict';

/*

	in my spawn function (generate enemies randomly)
	I create a new x location between 1280 to 3280 and compare it to the number that I've generated before
	I implemented a HashSet to store each enemies's spawned x locations because HashSet's contain method only cost O(1) average time complexity
	so we won't waste time to go through every element in the set.
	At last, I clear Set when it reach 20 capacity so we don't waste space also.

*/

var game = new Phaser.Game(1280, 640, Phaser.AUTO);
var message;
var style = { font: '24px Helvetica', fill: '#FFF'};
var checkPoint_x = 400;
// MainMenu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		game.load.image('ground', 'assets/img/Carrier_0001.png');
		game.load.image('box', 'assets/img/Box_Small_0003.png');
		game.load.image('ladder', 'assets/img/Ladder_Iron_0001.png');
		game.load.image('button', 'assets/img/Trap_Circle_0001.png');
		game.load.image('trap', 'assets/img/Wall_Trap_R_0001.png');
		game.load.image('trap2', 'assets/img/Trap_Circle_0003.png');
		game.load.image('spike', 'assets/img/Spikes_0003.png');

		game.load.image('item', 'assets/img/item.png',300, 300);
		game.load.spritesheet('hero', 'assets/img/hero.png',50 ,37);


	    game.load.tilemap('test', 'assets/map/t10.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create: function() {

	},
	update: function() {
        // jump to game play
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false);
		}
	}
}



// GameOver state
var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {

	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay', true, false);
		}
	}
}

// GamePlay State
var GamePlay = function(game) {
	this.SCALE = 3;
	this.MAX_X_VELOCITY = 500;	// measured in pixels/second
	this.MAX_Y_VELOCITY = 2500;
	this.ACCELERATION = 400;
	this.DRAG = 1000;			// note that DRAG < ACCELERATION (to create sliding)
	this.GRAVITY = 2600;
	this.JUMP_SPEED = -700;	// negative y-values jump up
	this.MAX_JUMPS = 3;
	this.speed = 1;
	this.tar = 0;
	this.reach = false;
 
};
GamePlay.prototype = {

	init: function() {

	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.physics.arcade.gravity.y = this.GRAVITY;
		game.physics.arcade.TILE_BIAS = 32;
		game.stage.backgroundColor = "#e0e0e0";

		this.map = game.add.tilemap('test');
		this.map.addTilesetImage('ground', 'ground');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		this.mapLayer.resizeWorld();

		this.checkPoint = this.add.sprite(1800, 945, 'item');
		game.physics.enable(this.checkPoint, Phaser.Physics.ARCADE);
		this.checkPoint.body.gravity.y = 3000;


		this.ladder = this.add.sprite(600, 345, 'ladder');
		this.ladder.scale.y = 3;
		game.physics.enable(this.ladder, Phaser.Physics.ARCADE);

		this.spike = this.add.sprite(1200, 945, 'spike');
		game.physics.enable(this.spike, Phaser.Physics.ARCADE);
		this.spike.scale.x = 3;


		this.player = this.add.sprite(checkPoint_x, 963, 'hero', 0);
		this.player.animations.add('run',[8, 9, 10, 11, 12], 8, true);
		this.player.animations.add('stand',[0,1,2,3], 4, true);
		this.player.animations.add('jump', [15, 16, 17, 18, 19, 20, 21, 22 ,23, 23, 23], 8, false);
		this.player.anchor.set(0.5);
		this.player.scale.setTo(3);

		game.physics.enable(this.player, Phaser.Physics.ARCADE);

		this.player.body.collideWorldBounds = true;
		this.player.body.maxVelocity.x = this.MAX_X_VELOCITY;
		this.player.body.maxVelocity.y = this.MAX_Y_VELOCITY;
		this.player.body.drag.setTo(this.DRAG, 0);
		this.player.body.setSize(18, 31, 15, 5);
		this.player.body.gravity.y = 3000;


		this.box = this.add.sprite(2750, 533, 'box');
		this.box.anchor.set(0.5);
		game.physics.enable(this.box, Phaser.Physics.ARCADE);
		//this.box.body.immovable = true;
		this.box.body.maxVelocity.x = this.MAX_X_VELOCITY;
		this.box.body.maxVelocity.y = this.MAX_Y_VELOCITY;
		this.box.body.drag.setTo(this.DRAG, 0);
		//this.box.body.gravity.y = 100;
		this.box.body.collideWorldBounds = true;

		this.box_2 = this.add.sprite(980, 305, 'box');
		this.box_2.anchor.set(0.5);
		game.physics.enable(this.box_2, Phaser.Physics.ARCADE);
		//this.box.body.immovable = true;
		this.box_2.body.maxVelocity.x = this.MAX_X_VELOCITY;
		this.box_2.body.maxVelocity.y = this.MAX_Y_VELOCITY;
		this.box_2.body.drag.setTo(this.DRAG, 0);
		this.box_2.body.gravity.y = 3000;
		this.box_2.body.collideWorldBounds = true;


		this.button = this.add.sprite(2090, 800, 'button');
		this.button.scale.setTo(0.2);
		game.physics.enable(this.button, Phaser.Physics.ARCADE);
		//this.button.body.immovable = true;
		this.button.body.gravity.y = 3000;

		this.trap_1 = this.add.sprite(2200, 600, 'trap');
		this.trap_1.scale.setTo(0.9);
		game.physics.enable(this.trap_1, Phaser.Physics.ARCADE);
		this.trap_1.body.velocity.y = 0;
		this.trap_1.body.immovable = true;
		this.trap_1.body.setSize(256, 80);

		this.trap_2 = this.add.sprite(2600, 600, 'trap');
		this.trap_2.scale.setTo(0.9);
		game.physics.enable(this.trap_2, Phaser.Physics.ARCADE);
		this.trap_2.body.velocity.y = 0;
		this.trap_2.body.setSize(256, 80);


		this.trap_3 = this.add.sprite(700, 600, 'trap2');
		this.trap_3.scale.setTo(0.5);
		this.trap_3.anchor.set(0.5);
		game.physics.enable(this.trap_3, Phaser.Physics.ARCADE);
		this.trap_3.pivot.x = 300;
		this.trap_3.angle = -180;
		this.trap_3.body.setSize(180, 180, 30, 30);


		//this.trap_2.body.immovable = true;

		game.camera.follow(this.player);
	},


	update: function() {


		if (this.trap_3.angle >= 0 && this.reach == false) {
			//console.log("DAWIodwaodpwa");
			this.trap_3.angle = 0;
			this.reach = true;
		} else {
			this.trap_3.angle += this.speed;
		}

		if (this.reach == true) {
				this.trap_3.angle -= 2 * this.speed;

				if (this.trap_3.angle <= 180 && this.trap_3.angle >= 0) {
					console.log("dddd " + this.trap_3.angle);
					this.trap_3.angle = 180;
					this.reach = false;
				}
				//console.log("dddd");
				//this.trap_3.angle == -180;
			
		}
		
		


		//console.log(this.trap_3.angle);

		var check = game.physics.arcade.collide(this.checkPoint, this.player);
		game.physics.arcade.collide(this.mapLayer, this.checkPoint);

		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.button, this.mapLayer);
		game.physics.arcade.collide(this.box, this.mapLayer);
		game.physics.arcade.collide(this.box_2, this.mapLayer);
		game.physics.arcade.collide(this.box, this.trap_1);

		var box_player = game.physics.arcade.collide(this.box, this.player);
		var button_player = game.physics.arcade.collide(this.button, this.player);

		game.physics.arcade.collide(this.trap_1, this.mapLayer);
		var t = game.physics.arcade.collide(this.trap_2, this.mapLayer);
		var a = game.physics.arcade.collide(this.trap_2, this.box); 

		var trap1_player = game.physics.arcade.collide(this.trap_1, this.player);
		var trap2_player = game.physics.arcade.collide(this.trap_2, this.player);
		var trap3_player = game.physics.arcade.collide(this.trap_3, this.player);
		var spike_player = game.physics.arcade.collide(this.spike, this.player);

		var onLadder = game.physics.arcade.overlap(this.player, this.ladder); 
		var box_2_player = game.physics.arcade.collide(this.box_2, this.player);

		if (check) {
			console.log("new check point: " + this.checkPoint.x);
			checkPoint_x = this.checkPoint.x;
			this.checkPoint.destroy();
		}

		if (a) {
			this.box.body.velocity.y = 0;
			this.trap_2.body.velocity.y = 0;
		}

		if (trap2_player) {
			if (this.player.body.touching.left || this.player.body.touching.right) {
				this.box.body.gravity.y = 100;
			}
			this.trap_2.body.velocity.x = 0;
			this.trap_2.body.immovable = true;
			if (this.player.body.touching.up) {
				console.log("dead");
				game.state.start('GamePlay', true, false);
			}
		}
		
		if (trap1_player && this.player.body.touching.up) {
				console.log("dead");
				game.state.start('GamePlay', true, false);
		}

		if (trap3_player) {
				console.log("dead");
				game.state.start('GamePlay', true, false);
		}

		if (spike_player) {
				console.log("dead");
				game.state.start('GamePlay', true, false);
		}

		if (button_player) {
			console.log("Trap drop");
			this.trap_1.body.velocity.y = 100;
			this.trap_2.body.velocity.y = 50;
			this.box.body.velocity.y = 50;
			this.button.destroy();
		}

		if (onLadder) {
			//console.log("on ladder");
			this.player.body.gravity.y = 0;
			this.player.body.velocity.y = 0;
			if(this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				this.player.body.velocity.y = this.JUMP_SPEED;
			}

			if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
				this.player.body.velocity.y = -this.JUMP_SPEED;
			}
		} else {
			this.player.body.gravity.y = 3000;
		}


		if (box_player && this.input.keyboard.isDown(Phaser.Keyboard.C) && !this.box.body.touching.up) {
			//this.box.body.gravity = 100;
			if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.velocity.x = -150;
				this.box.body.velocity.x = -300;
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.velocity.x = 150;
				this.box.body.velocity.x = 300;
			} else {
				this.player.body.acceleration.x = 0;
				this.box.body.acceleration.x = 0;
			}
		}


		if (box_2_player && this.input.keyboard.isDown(Phaser.Keyboard.C) && !this.box_2.body.touching.up) {
			//this.box.body.gravity = 100;
			if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.velocity.x = -150;
				this.box_2.body.velocity.x = -300;
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.velocity.x = 150;
				this.box_2.body.velocity.x = 300;
			} else {
				this.player.body.acceleration.x = 0;
				this.box_2.body.acceleration.x = 0;
			}
		}


		if (!box_player || !this.input.keyboard.isDown(Phaser.Keyboard.C)) {
			this.box.body.acceleration.x = 0;
			this.box.body.immovable = true;
			if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.acceleration.x = -this.ACCELERATION;
				this.player.scale.x = -3;
				this.player.animations.play('run');
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.acceleration.x = this.ACCELERATION;
				this.player.scale.x = 3;
				this.player.animations.play('run');
			} else {
				this.player.body.acceleration.x = 0;
				this.player.animations.play('stand');
			}
		}


		this.isGrounded = this.player.body.blocked.down;
	    // if so, we have jumps to spare
	    // change this.jumps to create double, triple, etc. jumps 🤾‍♀️
	    if(this.isGrounded || box_player) {
	    	this.player.body.setSize(18, 31, 15, 5);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	this.player.animations.play('jump');
	    }
	    // allow steady velocity change up to a certain key down duration
	    if(this.jumps > 0 && this.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
	    	this.player.body.setSize(18, 20, 15, 15);
	        this.player.body.velocity.y = this.JUMP_SPEED;
	        this.jumping = true;
	    } 
	    // finally, letting go of the UP key subtracts a jump
	    if(this.jumping && this.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
			
			

		

		if(this.input.keyboard.justPressed(Phaser.Keyboard.P)) {
			console.log(this.trap_3.angle);
			console.log(this.speed);
		}

	},

	// debug
	render: function() {
		game.debug.bodyInfo(this.player, 32, 32);
		game.debug.bodyInfo(this.box, 32, 132);
		this.game.debug.body(this.player);
		this.game.debug.body(this.trap_1);
		this.game.debug.body(this.trap_2);
		this.game.debug.body(this.trap_3);
		//game.debug.physicsGroup(badguyGroup);
	}

}

function handler (trap, box) { // collsion with baddies
	box.body.gravity.y = 0;
	trap.body.gravity.y = 0;
	//box.body.gravity.y = 0;
}

// add states
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
// start game at main menu state
game.state.start('MainMenu');
