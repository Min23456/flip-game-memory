let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matches = 0;
let gameStarted = false;
let startTime;
let timerInterval;
const cardSymbols = ['🎮', '🎯', '🎨', '🎪', '🎭', '🎸', '🎹', '🎺'];


function initGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    const cards =[...cardSymbols, ...cardSymbols];
    shuffle(cards);
    cards.forEach((Symbol, index) => {
        const card = createCard(Symbol, index);
        gameBoard.appendChild(card);
    });
    resetGameState();
   






}




function createCard(symbol, index) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back">${symbol}</div>
       
        </div>
    `;
    card.addEventListener('click', flipCard);
    return card;




}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; 1--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[1], array[j]] = [array[j], array[i]];


    }
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains('matched')) return;
    if (!gameStarted) {
        startGame();


    }
    this.classList.add('flipped');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
       
       
    }
    secondCard = this;
    moves++;
    updateMoves();
    checkForMatch();


}




function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCard();
        matches++;
        updatePairs();
        if (matches === 8) {
            setTimeout(showWinMessage, 500);
       


        }
    } else {
        unflippedCards();
    }
}




function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}



function startGame() {
    gameStarted = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);

}


function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}



function updateMoves() {
    document.getElementById('moves').textContent = moves;

}

function updatePairs(){
    document.getElementById('pairs').textContent = `${matches}/8`;
    
}


function resetGameState() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    moves = 0;
    matches =0;
    gameStarted = false;
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '00:00';
    document.getElementById('pairs').textContent = '0/8';
    hideWinMessage();

}



function showWinMessage() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    const timeText = document.getElementById('timer').textContent;
    document.getElementById('winText').textContent = `You completed the game in ${moves} moves and ${timeText}`;
    document.getElementById('overlay').classList.add('show');
    document.getElementById('winMessage').classList.add('show');


}

function hideWinMessage() {
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('winMessage').classList.remove('show');

}




function resetGame() {
    hideWinMessage();
    initGame();
}

window.addEventListener('load', initGame);


























