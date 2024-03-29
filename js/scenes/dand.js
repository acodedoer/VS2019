var dand = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function dand ()
    {
        Phaser.Scene.call(this, { key: 'dand' });
    },

    create: function ()
    {   
        this.cameras.main.setBackgroundColor('#78A1BB');
        this.selectedOption="";
        this.correctAnswers = 0;
        this.answers=[];
        this.selectedCount=0;
        this.questions=7;
        this.continueUse = 0;
        
        this.counter = 1;
        this.options = [{ pos: '0', text: '', button: '' }, { pos: '1', text: '', button: '' }, { pos: '2', text: '', button: '' }, { pos: '3', text: '', button: '' }];
        
        this.getInfo = this.cache.json.get('Mode2');
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
        this.home = this.add.image(0, 0, 'home2').setOrigin(0).setInteractive().setScale(game.global.scaleVar); 
        this.home.on('pointerdown', () => {this.scene.start('mainmenu')});
        
        this.nextQuestion();
    },
    
    showInfo: function(){
        var Q = "Q"+(this.counter-1);
        this.txtQuestion.destroy();
        this.continue.destroy();
        this.txtScore.destroy();
        this.scoreBoard.destroy();
        
        for (var i=0; i<4; i++)
        {
            try{this.options[i].text.destroy();}
            catch{}
            this.options[i].destroy();
        } 
        this.notice = this.add.image(window.innerWidth/2, window.innerHeight/2, 'notice2').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar); 
        this.txtQuestion = this.add.text(window.innerWidth/2,this.notice.y, this.getInfo[Q]['Info'], {fontFamily: 'font1',color:'#000000',fontSize: 70*game.global.scaleVar}).setOrigin(0.5).setWordWrapWidth(1340*game.global.scaleVar).setAlign('center');//setShadow(1,0.5);
        
        this.next = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*game.global.scaleVar), 'continue2').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar);
        this.next.on('pointerdown', () => {this.reset();});
    },
    
    reset: function(){
        this.notice.destroy();
        this.txtQuestion.destroy();
        this.next.destroy();
        this.selectedCount=0;
        this.questions-=1;
        if(this.questions==0){this.showFinalMessage();}//this.scene.start('mainmenu');}
        else{
        this.nextQuestion();}
    },
    
    showFinalMessage: function(){
        this.notice.destroy();
        this.txtQuestion.destroy();
        this.home.destroy();
        
        localStorage.setItem("mode2", 2);
        this.sound.play('done');
        
        this.congrats = this.add.image(window.innerWidth/2, 40, 'congrats1').setOrigin(0.5,0).setInteractive().setScale(game.global.scaleVar);
        
        this.notice = this.add.image(window.innerWidth/2, window.innerHeight/2, 'notice2').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar); 
        this.txtQuestion = this.add.text(window.innerWidth/2,this.notice.y, this.getInfo["Final"], {fontFamily: 'font1',color:"#000000",fontSize: 75*game.global.scaleVar}).setOrigin(0.5).setWordWrapWidth(1340*game.global.scaleVar).setAlign('center');//setShadow(1,0.5);
        
        this.home_ = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*game.global.scaleVar), 'home2').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar);
        this.home_.on('pointerdown', () => {this.scene.start('mainmenu');});
    },
    
    nextQuestion: function(){
        var Q = "Q"+this.counter;
        
        if (Q=="Q5"){
            this.graphicQuestion(Q);
        }
        
        else{
            this.answers = this.getInfo[Q]["CA"];
            this.correctAnswers = this.answers.length;

            console.log(this.answers);
            console.log(this.correctAnswers);
            
            this.scoreBoard = this.add.image(window.innerWidth, 0, 'score').setOrigin(1,0).setScale(game.global.scaleVar); 
            this.txtScore = this.add.text(this.scoreBoard.x-(540/2*(game.global.scaleVar)), this.scoreBoard.y+(240/2*(game.global.scaleVar)), "0/"+this.correctAnswers, {fontFamily: 'font1', color:"#000000",fontSize: 80*game.global.scaleVar}).setOrigin(0.5).setAlign('center');
            

            this.txtQuestion = this.add.text(window.innerWidth/2, window.innerHeight/2-(650*game.global.scaleVar), this.getInfo[Q]['Question'], {fontFamily: 'font1',fontSize: 80*game.global.scaleVar, color:'#FFffff'}).setOrigin(0.5).setWordWrapWidth(1300*game.global.scaleVar).setAlign('center');

            console.log('inside');
            this.options[0]= this.add.image(window.innerWidth/2, window.innerHeight/2-(260*game.global.scaleVar), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar);
            this.options[0].on('pointerdown', () => {this.selectedOption = 0;this.options[0].disableInteractive();this.clickHandler();});
            this.options[0].text = this.add.text(window.innerWidth/2, this.options[0].y, this.getInfo[Q]['options'][0][0], {fontFamily: 'font1',fontSize: 60*game.global.scaleVar, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*game.global.scaleVar).setAlign('center');//.setShadow(1,0.5);

            //this.add.bitmapText(720, this.options[0].y+150, 'yellowFont', this.getInfo[Q]['options'][0][0], 60).setOrigin(0.5);

            this.options[1] = this.add.image(window.innerWidth/2, window.innerHeight/2, 'optionBoxD').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar);
            this.options[1].on('pointerdown', () => {this.selectedOption = 1;this.options[1].disableInteractive();this.clickHandler();});
            this.options[1].text = this.add.text(window.innerWidth/2, this.options[1].y, this.getInfo[Q]['options'][1][0], {fontFamily: 'font1',fontSize: 60*game.global.scaleVar, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*game.global.scaleVar).setAlign('center');//.setShadow(1,0.5);

            this.options[2] = this.add.image(window.innerWidth/2, window.innerHeight/2+(260*game.global.scaleVar), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar);
            this.options[2].on('pointerdown', () => {this.selectedOption = 2;this.options[2].disableInteractive();this.clickHandler();});
            this.options[2].text = this.add.text(window.innerWidth/2, this.options[2].y, this.getInfo[Q]['options'][2][0], {fontFamily: 'font1',fontSize: 60*game.global.scaleVar, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*game.global.scaleVar).setAlign('center');//.setShadow(1,0.5);

            this.options[3] = this.add.image(window.innerWidth/2, window.innerHeight/2+(520*game.global.scaleVar), 'optionBoxD').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar);
            this.options[3].on('pointerdown', () => {this.selectedOption = 3; this.options[3].disableInteractive(); this.clickHandler();});
            this.options[3].text = this.add.text(window.innerWidth/2, this.options[3].y, this.getInfo[Q]['options'][3][0], {fontFamily: 'font1',fontSize: 60*game.global.scaleVar, color:'#000000'}).setOrigin(0.5).setWordWrapWidth(1300*game.global.scaleVar).setAlign('center');//.setShadow(1,0.5);
        }
        this.counter+=1;
    },
    
    clickHandler: function ()
    {
        var right = false;
        for(var i=0; i<this.correctAnswers; i++){
            if (this.selectedOption==this.answers[i]){
                this.sound.play('correct');
                this.options[this.selectedOption].setTexture('optionBoxR');
                this.options[this.selectedOption].text.setColor("#ffffff");
                this.selectedCount+=1;
                this.txtScore.setText(this.selectedCount+"/"+this.correctAnswers)
                right=true;
                break;
            }
        }
        
        if (right==false){
            this.sound.play('wrong');
            this.options[this.selectedOption].setTexture('optionBoxW');
            this.options[this.selectedOption].text.setColor("#ffffff");
        }
        else if (this.selectedCount==this.correctAnswers){  
            this.continue = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*game.global.scaleVar), 'continue2').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar);
            this.continue.on('pointerdown', () => {this.showInfo();});
        }
        
        console.log("progress:");
        console.log(this.selectedCount);
        console.log(this.correctAnswers);

    },
    
    clickHandler2: function ()
    {
        this.continue = this.add.image(window.innerWidth/2, window.innerHeight/2+(780*game.global.scaleVar), 'continue2').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar);
        this.txtScore.setText("1/"+this.correctAnswers)
        this.continue.on('pointerdown', () => {this.showInfo();});
    },
    
    graphicQuestion: function (Q)
    {
        this.answers = this.getInfo[Q]["CA"];
        this.correctAnswers = this.answers.length;
        
        this.scoreBoard = this.add.image(window.innerWidth, 0, 'score').setOrigin(1,0).setScale(game.global.scaleVar); 
        this.txtScore = this.add.text(this.scoreBoard.x-(540/2*(game.global.scaleVar)), this.scoreBoard.y+(240/2*(game.global.scaleVar)), "0/"+this.correctAnswers, {fontFamily: 'font1', color:"#000000",fontSize: 80*game.global.scaleVar}).setOrigin(0.5).setAlign('center');

        console.log(this.answers);
        console.log(this.correctAnswers);

        this.txtQuestion = this.add.text(window.innerWidth/2, window.innerHeight/2-(650*game.global.scaleVar), this.getInfo[Q]['Question'], {fontFamily: 'font1',fontSize: 80*game.global.scaleVar, color:'#FFffff'}).setOrigin(0.5).setWordWrapWidth(1300*game.global.scaleVar).setAlign('center');

        console.log('inside');
        this.options[0]= this.add.image(window.innerWidth/4, window.innerHeight/2-(200*game.global.scaleVar), 'vote1').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar*.72);
        this.options[0].on('pointerdown', () => {this.options[0].setFrame(1);this.options[0].disableInteractive();this.sound.play('wrong');});
        
        this.options[1]= this.add.image(window.innerWidth *3/4, window.innerHeight/2-(200*game.global.scaleVar), 'vote2').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar*.72);
        this.options[1].on('pointerdown', () => {this.options[1].setFrame(1);this.options[1].disableInteractive();this.sound.play('wrong');});

        this.options[2]= this.add.image(window.innerWidth/4, window.innerHeight/2+(390*game.global.scaleVar), 'vote3').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar*.72);
        this.options[2].on('pointerdown', () => {this.options[2].setFrame(1);this.options[2].disableInteractive(); this.clickHandler2();this.sound.play('correct');});
        
        this.options[3]= this.add.image(window.innerWidth *3/4,window.innerHeight/2+(390*game.global.scaleVar), 'vote4').setOrigin(0.5).setInteractive().setScale(game.global.scaleVar*.72);
        this.options[3].on('pointerdown', () => {this.options[3].setFrame(1);this.options[3].disableInteractive();this.sound.play('wrong');});
    }
});
