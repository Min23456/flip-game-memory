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