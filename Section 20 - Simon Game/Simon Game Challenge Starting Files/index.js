//Variables
let levelCount = 1;
let gameStart = false;
let randomNumbers = [];

//DOM Contants
const BUTTONS = $(".btn");
const HEADER = $("h1");

//Main
$(document).on('keypress', function(event){
    if(event.key === 'a'){
        
        $(document).off('keypress');
        
        HEADER.text("Level "+ levelCount);
        blinkButton();


    }
})

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

function verifyClick(){

}

function blinkButton(){
    
    let num = randomize();

    BUTTONS.eq(num).addClass("pressed");
    playSound(num);

    setTimeout(()=>{
        BUTTONS.eq(num).removeClass("pressed");
    },200);
}

function randomize(){
    randomNumbers.push(Math.floor(Math.random()*4));

    let num = randomNumbers[randomNumbers.length - 1];

    return num;
}