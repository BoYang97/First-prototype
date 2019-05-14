function Enemy1(game, x, y, key, frame, ground, player) {

    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.ground = ground;
    this.player = player;

    game.physics.arcade.enable(this);
    
    this.scale.setTo(1.5, 1.5);
    this.animations.add('run', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    this.animations.play('run');

    this.body.velocity.x = -200;
    this.body.setSize(20, 37, 18, 10);
    this.body.gravity.y = 300;
    this.body.bounce.y = 0.2;
    
    this.hitSFX = game.add.audio('hit');
};

Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
Enemy1.prototype.constructor = Enemy1;

Enemy1.prototype.update = function() {
    var eg = game.physics.arcade.collide(this, this.ground);
    var ep = game.physics.arcade.collide(this, this.player);
    if (ep) {
        if (getItem() > 0) {
            this.hitSFX.play();
            var hit = this.player.animations.play('hit');
            this.player.body.velocity.x = 0;
            hit.onComplete.add(run, this);
            this.destroy();
            usedItem();
        } else {
            music.stop();
            game.state.start('GameOver', true, false);
        }
    }
}
