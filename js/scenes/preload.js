var preload = new Phaser.Class({

    Extends: Phaser.Scene,

    //function that loads assests
preload: function  ()
    {
        this.load.image('button1', 'assets/bt1.png');
        this.load.image('button2', 'assets/bt2.png');
    },

    //function that creates game objects after preload
    create: function ()
    {
        //stsrt the main menu scene
        this.scene.start('mainmenu');
    }

});