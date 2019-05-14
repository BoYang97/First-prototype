function BackGround(game, x, y, key, frame, player, itemNum) {
    
    Phaser.Sprite.call(this, game, x, y);
    this.itemNum = itemNum;
    this.player = player;
    this.game = game;
    this.b9 = this.game.add.tileSprite(0, 0, this.game.width, this.game.cache.getImage('b9').height, 'b9');
    this.b9.scale.y = 5;
    this.b9.scale.x = 5;

    this.b1 = this.game.add.tileSprite(0, 120, this.game.width, this.game.cache.getImage('b1').height, 'b1');
    this.b1.scale.y = 2.5;
    this.b1.scale.x = 2.5;

    this.b2 = this.game.add.tileSprite(0, 120, this.game.width, this.game.cache.getImage('b2').height, 'b2');
    this.b2.scale.y = 2;
    this.b2.scale.x = 2;

    this.b6 = this.game.add.tileSprite(0, 120, this.game.width, this.game.cache.getImage('b6').height, 'b6');
    this.b6.scale.y = 2;
    this.b6.scale.x = 2;

    this.b7 = this.game.add.tileSprite(-150, 120, this.game.width, this.game.cache.getImage('b7').height, 'b7');  
    this.b7.scale.y = 2;
    this.b7.scale.x = 2;

    this.b8 = this.game.add.tileSprite(0, 180, this.game.width, this.game.cache.getImage('b8').height, 'b8');
    this.b8.scale.y = 2;
    this.b8.scale.x = 2;

    this.b4 = this.game.add.tileSprite(0, 120, this.game.width, this.game.cache.getImage('b4').height, 'b4');
    this.b4.scale.y = 2;
    this.b4.scale.x = 2;

    this.b5 = this.game.add.tileSprite(0, 110, this.game.width, this.game.cache.getImage('b5').height, 'b5');  
    this.b5.scale.y = 2.5;
    this.b5.scale.x = 2.5;


    this.b3 = this.game.add.tileSprite(0, 120, this.game.width, this.game.cache.getImage('b3').height, 'b3');  
    this.b3.scale.y = 2.5;
    this.b3.scale.x = 2.5;
};

BackGround.prototype = Object.create(Phaser.Sprite.prototype);
BackGround.prototype.constructor = BackGround;

BackGround.prototype.update = function() {
        this.b1.tilePosition.x -= 0.05;
        this.b2.tilePosition.x -= 0.05;
        this.b3.tilePosition.x += 0.01; 
        this.b4.tilePosition.x -= 0.03;
        this.b5.tilePosition.x -= 0.03;
        this.b8.tilePosition.x -= 0.05;
  
}
