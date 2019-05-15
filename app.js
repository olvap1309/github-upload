/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// array for player's score: 0-th for first player, 1-st for second
let score, roundSccore, activePlayer, dice, dicerow, maxscore;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
    // variable for dice, random number beetwen 1 and 6
    dice = Math.floor(Math.random() * 6) + 1;

    // display the result
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    
    // update roundscore
    if(dice === 1 || (dice === 6 && dicerow === 6)){
        dicerow = 0;
        nextPlayer();    
    }
    else{
        dicerow = dice;
        roundSccore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundSccore;
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    score[activePlayer] += roundSccore;
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    if(score[activePlayer] >= maxscore){
        document.querySelector(".player-" + activePlayer +"-panel").classList.remove('active');
        document.querySelector(".player-" + activePlayer +"-panel").classList.add('winner');
        document.getElementById('name-' + activePlayer).textContent = 'WINNER';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('.btn-roll').style.display = 'none';
    }
    else{
        nextPlayer();
    }
})

function nextPlayer(){
    roundSccore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundSccore;
    document.querySelector(".player-" + activePlayer +"-panel").classList.remove('active');
    activePlayer = (activePlayer + 1) % 2;
    document.querySelector(".player-" + activePlayer +"-panel").classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame(){
    document.getElementById('maxscore').value = '';
    document.querySelector('.btn-max').addEventListener('click', function(){
        maxscore = document.getElementById('maxscore').value;
        if(!maxscore || maxscore <= 0){
            maxscore = 100;
        }
    })
    document.querySelector(".player-1-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.add('active');
    document.querySelector(".player-1-panel").classList.remove('winner');
    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    activePlayer = 0;
    score = [0,0];
    roundSccore = 0;    
}