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





