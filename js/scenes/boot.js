//set basic game configuration variables, these can be accessed througout the game
var config = {
    type: Phaser.AUTO, 
    width: 1440, 
    height: 2560,
    backgroundColor: '#Ffffff', //Yellow:#78A1BB Blue:#F9C80E Green:#7DDF64 Red:#FE4A49
    scene: [preload, mainmenu, preparing, theday, dand]    //load all the scenes you've created in the scene files, the first scene that loads once the game is created is preload
};

var game = new Phaser.Game(config); //create game using your created configuration

//create other variables such as score that can be accessed in all scenes of the game here
game.global = {
    score : 0};
