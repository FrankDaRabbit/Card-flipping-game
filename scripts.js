const cards = document.querySelectorAll('.memory-card');
/*const flipCard = () => {
    console.log("card is clicked")
    console.log(this);
}*/


let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    //second click

    secondCard = this;


    checkForMatch();

}

function checkForMatch() {
    //do cards match?
    let isMatch = firstCard.dataset.framerwork === secondCard.dataset.framerwork;
    isMatch ? disableCards() : unflipCards();

    if (firstCard.dataset.framerwork === secondCard.dataset.framerwork) {
        // if it is a match
        disableCards();
    } else {
        // not a match
        unflipCards();

    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);

}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();
cards.forEach(card => card.addEventListener('click', flipCard));

