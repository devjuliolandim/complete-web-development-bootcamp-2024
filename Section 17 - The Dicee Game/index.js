let dice1 = Math.floor(Math.random() * 6) + 1;
let dice2 = Math.floor(Math.random() * 6) + 1;
let img1 = document.querySelector('.img1');
let img2 = document.querySelector('.img2');
let h1 = document.querySelector('h1');

img1.setAttribute('src', './images/dice' + dice1 + '.png');
img2.setAttribute('src', './images/dice' + dice2 + '.png');

//Change H1
if(dice1 > dice2){
    h1.innerHTML = "Player 1 Wins!"
}else if(dice2 > dice1){
    h1.innerHTML = "Player 2 Wins!"
}else{
    h1.innerHTML = "Draw!"
}

