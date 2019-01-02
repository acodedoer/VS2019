var preload = new Phaser.Class({

    Extends: Phaser.Scene,

    //function that loads assests
preload: function  ()
    {
        this.load.image('next', 'assets/next.png');
        this.load.image('notice', 'assets/notice.png');
        this.load.image('continue', 'assets/continue.png');
        this.load.image('questionBox', 'assets/questionBox.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('warning', 'assets/warning.png');
        this.load.image('button1', 'assets/bt1.png');
        this.load.image('button2', 'assets/bt2.png');
        this.load.spritesheet('optionBox', 'assets/optionBox.png', { frameWidth: 1632, frameHeight: 362});
        this.load.bitmapFont('yellowFont', 'assets/fonts/bitmap/yellowfont.png', 'assets/fonts/bitmap/yellowfont.fnt');
        this.load.json('Mode1', 'js/Mode1.json ');
    },
    
    //function that creates game objects after preload
    create: function ()
    {
        //stsrt the main menu scene
        this.scene.start('mainmenu');
    }

});