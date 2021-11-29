// JS goes in here

// To Do
// Check that no two drawn cards in the hand are the same
// disable the deal button until the game has started
// Add a dealer to the game
// Add an option to stick

const suits = [ "Hearts", "Diamonds", "Clubs", "Spades" ];
const cards = [ "Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
const handCont = document.getElementById("hand-cont");
const handScore = document.getElementById("hand-score");
const startBtn = document.getElementById("start-btn");
const dealBtn = document.getElementById("deal-btn");
let gameActive = "false"
let hand = [];
let handTotal = 0;

dealBtn.disabled = true;

function pickCard() {
    const card = cards[(Math.floor(Math.random() * cards.length))];
    return card;
};

function pickSuit() {
    const suit = suits[(Math.floor(Math.random() * suits.length))];
    return suit;
};

function randomCard() {
    let name = pickCard();
    let suit = pickSuit();
    let value = ""
        if (name === "Ace") {
            value = 11;
        } else if (name === "King" || name === "Queen" || name === "Jack") {
            value = 10;
        } else {
            value = name;
        };
        card = [name, suit, value];
        return card;
};

function checkTotal() {
    if (handTotal == 21) {
        handScore.innerHTML = `<p>Blackjack! Your score is ${handTotal}, you win 🥳</p>`;
    }
    else if (handTotal > 21) {
        handScore.innerHTML = `<p>Bust! Your score is ${handTotal}, you lose 😟</p>`;
        dealBtn.disabled = true;
    } else {
        handScore.innerHTML = `<p>Your score is ${handTotal}, would you like another card 🤔?<p>`;
    };
};

function renderCard() {
    hand.push(card);
    handTotal += card[2];
    handCont.innerHTML += `
        <div class="card ${card[1]}">
            <p>${card[0]} of ${card[1]}</p>
        </div>
    `;
    checkTotal();
};


dealBtn.addEventListener("click", function() {
    if (gameActive) {
        randomCard();
        renderCard() ; 
    } else {
        dealBtn.disabled = true
    };
    
});

startBtn.addEventListener("click", function() {
    if (hand.length > 0) {
        hand = [];
        handTotal = 0;
        handCont.innerHTML = "";
        handScore.innerHTML = "";
        startBtn.textContent = "Start the game";
    } else {
        for (let i = 0; i < 2; i++) {
            randomCard();
            renderCard();
            dealBtn.disabled = false;
            gameActive = true;
        }
        startBtn.textContent = "Restart the game"
    };   
});

console.log(dealBtn);