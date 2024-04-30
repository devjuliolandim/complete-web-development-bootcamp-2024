function rollDices(){
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let img1 = document.querySelector('.img1');
    let img2 = document.querySelector('.img2');
    let h1 = document.querySelector('h1');

    img1.setAttribute('src', pickImage(dice1));
    img2.setAttribute('src', pickImage(dice2));

    //Change H1
    if(dice1 > dice2){
        h1.innerHTML = "Player 1 Wins!"
    }else if(dice2 > dice1){
        h1.innerHTML = "Player 2 Wins!"
    }else{
        h1.innerHTML = "Refresh Me"
    }
}

function pickImage(num){
    switch(num){
        case 1:
            return "./images/dice1.png" 
        case 2:
            return "./images/dice2.png" 
        case 3:
            return "./images/dice3.png" 
        case 4:
            return "./images/dice4.png"
        case 5:
            return "./images/dice5.png"
        case 6:
            return "./images/dice6.png"                        
    }
}

window.addEventListener('load',function(){
    rollDices();
})