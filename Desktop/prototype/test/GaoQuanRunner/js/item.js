function Item(game, x, y, key, frame, mapLayer, player) {
    
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.mapLayer = mapLayer;
    this.player = player;
    this.game = game;

    game.physics.arcade.enable(this);
    this.immovable = true;
  //  this.scale.setTo(1.5, 1.5);
};

Item.prototype = Object.create(Phaser.Sprite.prototype);
Item.prototype.constructor = Item;

Item.prototype.update = function() {
    game.physics.arcade.collide(this, this.mapLayer);
    game.physics.arcade.collide(this, this.player);
}
