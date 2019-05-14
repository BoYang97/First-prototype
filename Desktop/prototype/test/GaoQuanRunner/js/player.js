function Player(game, x, y, key, frame, ) {

	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.game = game;
  this.scale.setTo(2);

  game.physics.arcade.enable(this);

  this.animations.add('run',[8, 9, 10, 11, 12], 8, true);
  this.animations.add('jump', [15, 16, 17, 18, 19, 20, 21, 22 ,23, 23, 23], 8, false);
  this.animations.add('hit', [53, 54, 55, 56],10, false);
  this.animations.play('run');

  this.jumpSFX = game.add.audio('jump');

  this.body.gravity.y = 600;
  this.body.collideWorldBounds = true;
  this.body.setSize(20, 37, 18);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.y > 475) { // only allow play jump once per time
      if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
          this.jumpSFX.play();
          this.body.velocity.y = -420;
          var jump = this.animations.play('jump');
          jump.onComplete.add(run, this);
      }
    }
}
