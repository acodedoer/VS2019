var mainmenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function mainmenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
    },

    create: function ()
    {   
        //this.cameras.main.setBackgroundColor('#ffffff');
        this.add.text(720, 1500, 'text', {
            fontFamily: 'font1',fontSize: 300
        }).setWordWrapWidth(300);
        this.bt1 = this.add.image(0+80, 80, 'button1').setOrigin(0).setInteractive();
        this.bt1.on('pointerdown', this.clickHandler, this);
        var bt2 = this.add.image(1440-80, 80, 'button2').setOrigin(1,0).setInteractive();

        bt2.on('clicked', this.clickHandlerBt2, this);
        
    },
    
    clickHandler: function (bt)
    {
        this.scene.start('preparing');
    },
    
    clickHandlerBt2: function ()
    {
        
    }
});
