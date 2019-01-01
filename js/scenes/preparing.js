var preparing = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function preparing ()
    {
        Phaser.Scene.call(this, { key: 'preparing' });
    },

    create: function ()
    {           
        var bt2 = this.add.image(1440-80, 80, 'button2').setOrigin(1,0).setInteractive();
        bt2.on('clicked', this.clickHandlerBt2, game);
        
    },
    
    clickHandler: function (bt)
    {
        console.log("clicked");
    },
    
    clickHandlerBt2: function ()
    {
        
    }
});
