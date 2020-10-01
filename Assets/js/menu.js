/* Gör en menu .js md NavigationPreloadManager, create, startGame fuction */
var Menu = {
    
    preload : function() {
        game.load.image('menu', './assets/images/menu.png');


    },

    create : function() {
       // console.log("menu.js create function");
        this.add.button(0,0, 'menu', this.startGame, this);

          

    },

    update : function() {

        
    },

    
    startGame : function() {
        this.state.start('Game');
        

    }

};
