//Variables
let levelCount = 1;
let drawnNumbers = [];
let arrayClicked = [];

//DOM Contants
const BUTTONS = $(".btn");
const HEADER = $("h1");
const BODY = $("body");

//Main
$(document).on('keypress', function(event){
    if(event.key === 'a'){
        initializeGame();
    }
})

function initializeGame() {
    $(document).off('keypress');
    HEADER.text("Level " + levelCount);
    randomizeButton();

    BUTTONS.on('click', verifyClick);
}

function playSound(number){
    switch(number){
        case 0:
            var audio = new Audio('sounds/green.mp3');
            audio.play();
        break;
        case 1:
            var audio = new Audio('sounds/red.mp3');
            audio.play();
        break;
        case 2:
            var audio = new Audio('sounds/yellow.mp3');
            audio.play();
        break;
        case 3:
            var audio = new Audio('sounds/blue.mp3');
            audio.play();
        break;          
    }
}

function verifyClick(btn){
    var index = BUTTONS.index($(btn.target));
    arrayClicked.push(index);
    
    //Verify if the button clicked is correct!
    if(drawnNumbers[arrayClicked.length - 1] === index){
        //Verify if the drawnNumbers.length is equal to arrayClicked!
        if(arrayClicked.length == drawnNumbers.length){
            nextLevel();
        }
    }else{
        errorScreen()
    }

}

function nextLevel() {
    arrayClicked = [];
    levelCount++;
    HEADER.text("Level " + levelCount);
    randomizeButton();
}

function randomizeButton(){
    
    let num = randomize();

    BUTTONS.eq(num).addClass("pressed");
    playSound(num);

    setTimeout(()=>{
        BUTTONS.eq(num).removeClass("pressed");
    },200);
}

function randomize(){
    drawnNumbers.push(Math.floor(Math.random()*4));

    let num = drawnNumbers[drawnNumbers.length - 1];

    return num;
}

function errorScreen(){
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();

    BODY.addClass("red");
    setTimeout(()=>{
        BODY.removeClass("red");
    },250)
    
    HEADER.text("You clicked in the wrong button! Press A Key to restart the game!");

    levelCount = 1;
    drawnNumbers = [];
    arrayClicked = [];

    BUTTONS.off("click", verifyClick)
    
    $(document).on("keypress", function (event){
        if(event.key === 'a'){
            $(document).off('keypress');
            HEADER.text("Level "+ levelCount);
            randomizeButton();

            BUTTONS.on('click', verifyClick)
        }
    })

}
