//start game 
const deck = document.querySelector('.deck');
start();

//initiate the number of moves
const moves = document.querySelector('.moves');
moves.textContent = 0;

//restart game
const restart = document.querySelector('.restart');
restart.addEventListener('click', function (event) {
    location.reload();
});

//Create an array for opening cards
let cardOpen = [];
let matched = 0;

//Compare cards using eventListener
deck.addEventListener('click', function (event) {
    if (event.target.nodeName === "LI") {
        if (event.target.className != 'card show open' &&
            event.target.className != 'card match' &&
            cardOpen.length < 2) {
            event.target.classList.add('show', 'open');
            cardOpen.push(event.target);
            if (cardOpen.length === 2) {
                //Increase moves number
                moves.textContent = parseInt(moves.textContent) + 1;
                if (cardOpen[0].innerHTML === cardOpen[1].innerHTML) {
                    cardOpen[0].classList.add("match");
                    cardOpen[1].classList.add("match");
                    cardOpen[0].classList.remove('show', 'open');
                    cardOpen[1].classList.remove('show', 'open');
                    cardOpen = []; //When the cards are two cards, initialize the card array.
                    matched = matched + 2; //Increase matched variable
                    //If matched are 16, show up win message.
                    setTimeout(function () {
                        if (matched === 16) {
                            alert("Congratulations!!!");
                        }
                    }, 300);
                    //If cards are not matched, turn back cards    
                } else if (cardOpen[0].innerHTML !== cardOpen[1].innerHTML) {
                    setTimeout(function () {
                        cardOpen[0].classList.remove("show", "open");
                        cardOpen[1].classList.remove("show", "open");
                        cardOpen = [];
                    }, 500);
                } else if (cardOpen.length > 2) {
                    return false; //Avoid more than three cards being opened. 
                }
            }
        }
    }
});

//When the browser is opened or when the restart button is clicked
function start() {
    //Create and invoke a new array to insert 'card' class element.
    const card = document.querySelectorAll(".card");
    const cards = [];

    for (let i = 0; i < card.length; i++) {
        cards.push(card[i]);
    };
    //shuffle and relocate cards
    var shuffleCards = shuffle(cards);
    for (let i = 0; i < shuffleCards.length; i++) {
        deck.appendChild(shuffleCards[i]);
    };
}

//The shuffle function what is already built in
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};