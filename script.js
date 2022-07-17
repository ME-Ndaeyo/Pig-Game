'use strict';
var scores, roundScore, activePlayer, gamePlaying, diceDOM, current0DOM,
current1DOM, score0DOM, score1DOM, lastRoll, target;

gamePlaying = true;
diceDOM = document.querySelector('.dice');
init();

// DICE ROLL
document.querySelector('.btn--roll').addEventListener('click', function() {
    if(gamePlaying === true){
        // Random number
        var dice = Math.floor(Math.random()*6) + 1;
        // Display the result
        diceDOM.style.display = 'block'; 
        diceDOM.src = 'dice-'+dice+'.png';
        // Update roundscore IF player rolls two sixes in a row
        if (lastRoll === 6 && dice === 6){
            document.querySelector('#score--'+ activePlayer).textContent = '😞';
            scores[activePlayer] = 0;
            toggle();
        } 
        // IF random number is not 1
        else if (dice !== 1){
            roundScore += dice;
            document.querySelector('#current--' +activePlayer).textContent = roundScore
        } else {
            toggle()
        }
        lastRoll = dice;
    }
})

// NEW GAME
document.querySelector('.btn--new').addEventListener('click', init)

//SAVING SCORE TO SCORE BOARD
document.querySelector('.btn--hold').addEventListener('click', function(){
    if(gamePlaying === true){
        scores[activePlayer]+= roundScore
        document.querySelector('#score--'+ activePlayer).textContent = scores[activePlayer]
        document.getElementById('current--'+activePlayer).textContent = '0';
        // SETTING TARGET SCORE
        target = +(document.querySelector('.target-score').value);
        var winningScore;
        if(target){
            winningScore = target;
        } else{
            winningScore = 100;
        }
        //. WINNING STATEMENT
        if(document.getElementById('score--'+activePlayer).textContent >= winningScore){
            win();
        } else{
            toggle();
        }
    }
}) 

// TOGGLE
function toggle(){
    document.getElementById('current--'+activePlayer).textContent = '0';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastRoll = 0;
    document.querySelector('.player--1').classList.toggle('player--active')
    document.querySelector('.player--0').classList.toggle('player--active')
    diceDOM.style.display = 'none';
}

// INITIALIZE 
function init(){
gamePlaying = true;
    if(gamePlaying === true){
        scores = [0,0];
        roundScore = 0;
        activePlayer = 0;
        lastRoll = 0;
        target = 'SET TARGET';
        diceDOM.style.display = 'none'; 
        document.getElementById('score--0').textContent = '0';
        document.getElementById('score--1').textContent = '0';
        document.getElementById('current--0').textContent = '0';
        document.getElementById('current--1').textContent = '0';
        document.querySelector('#name--0').textContent = 'Player 1';
        document.querySelector('#name--1').textContent = 'Player 2'; 
        document.querySelector('.player--0').classList.remove('player--winner');
        document.querySelector('.player--1').classList.remove('player--winner');
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.remove('player--active');
        document.querySelector('.player--0').classList.add('player--active');  
    }
}

// WIN
function win(){
    document.querySelector('#name--'+activePlayer).textContent = 'WINNER!!!🥳🍾';
    document.querySelector('.player--'+activePlayer).classList.add('player--winner');
    document.querySelector('.player--'+activePlayer).classList.remove('player--active');
    gamePlaying = false;
    roundScore = 0;
}

// NAV HIDE AND DISPLAY
var nav = document.querySelector('h1')
var links = document.querySelector('.links')
nav.addEventListener('click', function hideLinks(){
    if(links.style.display == 'none'){
        links.style.display = 'block';
    } else {
        links.style.display = 'none';
    }
})
document.querySelector('main').addEventListener('click', function(){
    if(links.style.display == 'block'){
        links.style.display = 'none';
    }
})