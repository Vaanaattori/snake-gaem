var head, snake, apple, score, speed, updateDelay, direction, new_direction, squareSize, cursors, addNew, scoreString;



var Game = {
    
    preload : function() {
        game.load.image('snake', './Assets/Images/snake.png');
        game.load.image('apple', './Assets/Images/apple.png');
        game.load.audio('hit', './Assets/Audio/SullyGroan.mp3?', './Assets/Audio/SullyGroan.ogg?' + Date.now());   


    },

    create : function() {
        snake = [];
        apple = {};
        speed = 2;
        score = 0;
        squareSize = 15;
        direction = 'right';
        new_direction = null;
        updateDelay = 0;

        gameoverAudio = this.add.audio('hit');

        game.stage.backgroundColor = '#1a7e11';

        cursors = game.input.keyboard.createCursorKeys();

        this.generateApple();
        
        for(var i = 0; i < 20; i++) {
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');
            
        }

        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center"};
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center"};
        //scoreText = game.add.text(10, 10, scoreString + score.toString(), { font: '12px Arial', fill: '#fff' });
        this.scoreText = game.add.text(90, 18, score);
        this.scoreText.fill = '#ffffff';

        if(!game.device.desktop) {
            this.addMobileInputs();
        }

        
    },

    update : function() {

        if(cursors.right.isDown && direction!='left') {
            new_direction = 'right';
        } else if(cursors.left.isDown && direction!='right') {
            new_direction = 'left';
        } else if(cursors.up.isDown && direction!='down') {
            new_direction = 'up';
        } else if(cursors.down.isDown && direction!='up') {
            new_direction = 'down';
        }

        // get the snake groving
        updateDelay++;
        
        if(updateDelay % (10-speed) == 0) {

            var firstCell = snake[snake.length -1],
            lastCell = snake.shift(),
            oldLastCellx = lastCell.x,
            oldLastCelly = lastCell.y;

            if(new_direction) {
                direction = new_direction;
                new_direction = null;


            }
            
            if(direction == 'right' ) {
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            } else if(direction == 'left') {
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            } else if(direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            } else if(direction == 'down') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            snake.push(lastCell);
            firstCell = lastCell;

            if(addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            this.appleColission();
            this.selfColission(firstCell);
            this.wallColission(firstCell);

            speed = Math.min(10, Math.floor(score/1));
        }
        
    },

    addMobileInputs: function() {
		
        // Movement variables
        this.moveUp = false;
        this.moveRight = false;
        this.moveDown = false;
        this.moveLeft = false;


        // Add the up button
        this.upButton = game.add.sprite(65, 250, 'upButton');
        this.upButton.inputEnabled = true;
        this.upButton.events.onInputOver.add(function(){this.moveUp = true; this.upButton.alpha = 1;}, this);
        this.upButton.events.onInputOut.add(function(){this.moveUp = false; this.upButton.alpha = 0.5;}, this);
        this.upButton.events.onInputDown.add(function(){this.moveUp = true; this.upButton.alpha = 1;}, this);
        this.upButton.events.onInputUp.add(function(){this.moveUp = false; this.upButton.alpha = 0.5;}, this);
        this.upButton.alpha = 0.5;
        
        // Add the right button
        this.rightButton = game.add.sprite(125, 310, 'rightButton');
        this.rightButton.inputEnabled = true;
        this.rightButton.events.onInputOver.add(function(){this.moveRight = true; this.rightButton.alpha = 1;}, this);
        this.rightButton.events.onInputOut.add(function(){this.moveRight = false; this.rightButton.alpha = 0.5;}, this);
        this.rightButton.events.onInputDown.add(function(){this.moveRight = true; this.rightButton.alpha = 1;}, this);
        this.rightButton.events.onInputUp.add(function(){this.moveRight = false; this.rightButton.alpha = 0.5;}, this);
        this.rightButton.alpha = 0.5;
        
        // Add the down button
        this.downButton = game.add.sprite(65, 370, 'downButton');
        this.downButton.inputEnabled = true;
        this.downButton.events.onInputOver.add(function(){this.moveDown = true; this.downButton.alpha = 1;}, this);
        this.downButton.events.onInputOut.add(function(){this.moveDown = false; this.downButton.alpha = 0.5;}, this);
        this.downButton.events.onInputDown.add(function(){this.moveDown = true; this.downButton.alpha = 1;}, this);
        this.downButton.events.onInputUp.add(function(){this.moveDown = false; this.downButton.alpha = 0.5;}, this);
        this.downButton.alpha = 0.5;
        
        // Add the left button
        this.leftButton = game.add.sprite(5, 310, 'leftButton');
        this.leftButton.inputEnabled = true;
        this.leftButton.events.onInputOver.add(function(){this.moveLeft = true; this.leftButton.alpha = 1;}, this);
        this.leftButton.events.onInputOut.add(function(){this.moveLeft = false; this.leftButton.alpha = 0.5;}, this);
        this.leftButton.events.onInputDown.add(function(){this.moveLeft = true; this.leftButton.alpha = 1;}, this);
        this.leftButton.events.onInputUp.add(function(){this.moveLeft = false; this.leftButton.alpha = 0.5;}, this);
        this.leftButton.alpha = 0.5;
    
    
    
},

    appleColission: function() {


        console.log('cheese')
        for(var i = 0; i < snake.length; i++) {
            if(snake[i].x == apple.x && snake[i].y == apple.y) {

            addNew = true;

            apple.destroy();

            this.generateApple();

            score++;

            this.scoreText.text = score;

            
            }
        }
    },


    
    generateApple: function() {

        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

        apple = game.add.sprite(randomX, randomY, 'apple');

    },

    selfColission: function(head) {
        for(var i = 0; i < snake.length -1; i++) {
            if(head.x == snake[i].x && head.y == snake[i].y) {
                gameoverAudio.play();
                game.state.start('Game_Over');

            }
        }

    },

    wallColission: function(head) {
        if(head.x >= 600 || head.x <3 || head.y >=450 || head.y < 0) {
            gameoverAudio.play();
            game.state.start('Game_Over');
        }
    }



};