var preparing = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function preparing ()
    {
        Phaser.Scene.call(this, { key: 'preparing' });
    },

    create: function ()
    {   
        this.cameras.main.setBackgroundColor('#f3cca3');
        this.selectedOption="";
        this.correctAnswers = 0;
        this.answers=[];
        this.selectedCount=0;
        this.questions=3;
        this.continueUse = 0;
        
        this.counter = 1;
        this.options = [{ pos: '0', text: '', button: '' }, { pos: '1', text: '', button: '' }, { pos: '2', text: '', button: '' }, { pos: '3', text: '', button: '' }];
        
        this.getInfo = this.cache.json.get('Mode1');
        console.log(this.getInfo);
        console.log(this.txtQuestion);
        
        //this.questionBox= this.add.image(720, 0, 'questionBox').setOrigin(0.5,0);   
        /*this.options[0]= this.add.image(80, 900, 'optionBox').setOrigin(0,0).setInteractive();
        this.options[0].on('pointerdown', () => {this.selectedOption = 0;this.clickHandler();});

        this.options[1] = this.add.image(80, 1200+80, 'optionBox').setOrigin(0,0).setInteractive();
        this.options[1].on('pointerdown', () => {this.selectedOption = 1;this.clickHandler();});
        
        this.options[2] = this.add.image(80, 1500+160, 'optionBox').setOrigin(0,0).setInteractive();
        this.options[2].on('pointerdown', () => {this.selectedOption = 2;this.clickHandler();});
        
        this.options[3] = this.add.image(80, 1800+240, 'optionBox').setOrigin(0,0).setInteractive();
        this.options[3].on('pointerdown', () => {this.selectedOption = 3;this.clickHandler();});
        */
        this.next = this.add.image(0, 0, 'next').setOrigin(0).setInteractive(); 
        this.next.on('pointerdown', this.reset, this);
        
        this.nextQuestion();
    },
    
    showInfo: function(){
        var Q = "Q"+(this.counter-1);
        this.txtQuestion.destroy();
        this.continue.destroy();
        
        for (var i=0; i<4; i++)
        {
            this.options[i].text.destroy();
            this.options[i].destroy();
        } 
        this.notice = this.add.image(720, 0, 'notice').setOrigin(0.5,0).setInteractive(); 
        this.txtQuestion = this.add.text(720,920, this.getInfo[Q]['Info'], {fontFamily: 'font1',fontSize: 100}).setOrigin(0.5).setWordWrapWidth(1360).setAlign('center');//setShadow(1,0.5);
        
        this.next = this.add.image(720, 2100+100, 'continue').setOrigin(0.5,0).setInteractive();
        this.next.on('pointerdown', () => {this.reset();});
    },
    
    reset: function(){
        this.notice.destroy();
        this.txtQuestion.destroy();
        this.next.destroy();
        for (var i=0; i<4; i++)
        {
            this.options[i].text.destroy();
            this.options[i].destroy();
        } 
        this.selectedCount=0;
        this.questions-=1;
        if(this.questions==0){this.scene.start('mainmenu');}
        else{
        this.nextQuestion();}
    },
    
    nextQuestion: function(){
        var Q = "Q"+this.counter;
        
        this.answers = this.getInfo[Q]["CA"];
        this.correctAnswers = this.answers.length;
        
        console.log(this.answers);7
        console.log(this.correctAnswers);
        
        //this.txtQuestion = this.add.bitmapText(720, 450, 'yellowFont', this.getInfo[Q]['Question'], 60).setOrigin(0.5).setCenterAlign();
        this.txtQuestion = this.add.text(720, 450, this.getInfo[Q]['Question'], {fontFamily: 'font1',fontSize: 100, color:'#FFffff'}).setOrigin(0.5).setWordWrapWidth(1000).setAlign('center');//.setShadow(1,0.5);
      
        console.log('inside');
        this.options[0]= this.add.image(720, 900, 'optionBox').setOrigin(0.5,0).setInteractive();
        this.options[0].on('pointerdown', () => {this.selectedOption = 0;this.options[0].disableInteractive();this.clickHandler();});
        this.options[0].text = this.add.text(720, this.options[0].y+150, this.getInfo[Q]['options'][0][0], {fontFamily: 'font1',fontSize: 80, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300).setAlign('center');//.setShadow(1,0.5);
        
        //this.add.bitmapText(720, this.options[0].y+150, 'yellowFont', this.getInfo[Q]['options'][0][0], 60).setOrigin(0.5);
        
        this.options[1] = this.add.image(720, 1200+20, 'optionBox').setOrigin(0.5,0).setInteractive();
        this.options[1].on('pointerdown', () => {this.selectedOption = 1;this.options[1].disableInteractive();this.clickHandler();});
        this.options[1].text = this.add.text(720, this.options[1].y+150, this.getInfo[Q]['options'][1][0], {fontFamily: 'font1',fontSize: 80, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300).setAlign('center');//.setShadow(1,0.5);
        
        this.options[2] = this.add.image(720, 1500+40, 'optionBox').setOrigin(0.5,0).setInteractive();
        this.options[2].on('pointerdown', () => {this.selectedOption = 2;this.options[2].disableInteractive();this.clickHandler();});
        this.options[2].text = this.add.text(720, this.options[2].y+150, this.getInfo[Q]['options'][2][0], {fontFamily: 'font1',fontSize: 80, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300).setAlign('center');//.setShadow(1,0.5);
        
        this.options[3] = this.add.image(720, 1800+60, 'optionBox').setOrigin(0.5,0).setInteractive();
        this.options[3].on('pointerdown', () => {this.selectedOption = 3; this.options[3].disableInteractive(); this.clickHandler();});
        this.options[3].text = this.add.text(720, this.options[3].y+150, this.getInfo[Q]['options'][3][0], {fontFamily: 'font1',fontSize: 80, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300).setAlign('center');//.setShadow(1,0.5);
        
        this.counter+=1;
    },
    
    clickHandler: function ()
    {
        var right = false;
        for(var i=0; i<this.correctAnswers; i++){
            if (this.selectedOption==this.answers[i]){
                this.options[this.selectedOption].setFrame(1);
                this.options[this.selectedOption].text.setColor("#ffffff");
                this.selectedCount+=1;
                right=true;
                break;
            }
        }
        
        if (right==false){
            this.options[this.selectedOption].setFrame(2);
            this.options[this.selectedOption].text.setColor("#ffffff");
        }
        else if (this.selectedCount==this.correctAnswers){  
            this.continue = this.add.image(720, 2100+100, 'continue').setOrigin(0.5,0).setInteractive();
            this.continue.on('pointerdown', () => {this.showInfo();});
        }
        
        console.log("progress:");
        console.log(this.selectedCount);
        console.log(this.correctAnswers);

    },
    
    clickHandlerBt2: function ()
    {
        
    }
});
