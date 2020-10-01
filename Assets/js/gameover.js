var Game_Over = {
    
    preload : function() {
        game.load.image('gameover', './Assets/images/gameover.png');


    },

    create : function() {
        console.log("menu.js create function");
        this.add.button(0,0, 'gameover', this.startGame, this);
          

    },

    update : function() {

        
    },

    startGame : function() {
    
        this.state.start('Game');
        console.log("din mamma");

}
};