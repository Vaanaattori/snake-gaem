var Game;

game = new Phaser.Game(600,450, Phaser.AUTO, 'gameDiv');

game.state.add('Boot', Boot);
game.state.add('Load', Load);
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

game.state.start('Boot');