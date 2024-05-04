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


