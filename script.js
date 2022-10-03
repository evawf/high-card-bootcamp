// Please implement exercise logic here
let playersTurn = 1; // matches with starting instructions
let player1Card;
const player1Button = document.createElement("button");
player1Button.classList.add("btn");
const player2Button = document.createElement("button");
player2Button.classList.add("btn");
const gameInfo = document.createElement("div");
gameInfo.classList.add("outputMsg");

let canClick = true;
const cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
cardContainer.prepend(gameInfo);
document.body.appendChild(cardContainer);

// Init
const initGame = () => {
  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "It's player 1 turn. Click to draw a card!";
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  // const suits = ["hearts", "diamonds", "clubs", "spades"];
  const suitsArr = [
    { name: "hearts", symbol: "♥︎h" },
    { name: "diamonds", symbol: "♦︎d" },
    { name: "clubs", symbol: "♣︎c" },
    { name: "spades", symbol: "♠︎s" },
  ];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suitsArr.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suitsArr[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }

      let cardColor;
      if (currentSuit.symbol === "♥︎" || currentSuit.symbol === "♦︎") {
        cardColor = "red";
      } else {
        cardColor = "black";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit.name,
        suitSymbol: currentSuit.symbol,
        rank: rankCounter,
        color: cardColor,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  // name.classList.add("name", cardInfo.colour);
  name.classList.add("name");

  name.innerText = cardInfo.name;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

let player1RankDifference;
let player2RankDifference;

const computeRankDifference = (arr) => {
  let rankArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    rankArr.push(arr[i].rank);
  }
  return Math.max(...rankArr) - Math.min(...rankArr);
};

let numOfCards = Math.floor(Math.random() * 3 + 2);
const createCards = (num) => {
  const cardsArr = [];
  for (let i = 0; i < num; i += 1) {
    player1Card = deck.pop();
    cardsArr.push(player1Card);
  }
  if (playersTurn === 1) {
    player1RankDifference = computeRankDifference(cardsArr);
  }
  if (playersTurn === 2)
    player2RankDifference = computeRankDifference(cardsArr);

  const cardElements = document.createElement("div");
  cardElements.classList.add("cardsDiv");
  for (let i = 0; i < cardsArr.length; i += 1) {
    const cardElement = createCard(cardsArr[i]);
    cardElements.appendChild(cardElement);
  }
  return cardElements;
};

const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      cardContainer.innerHTML = "";
      // Append the card element to the card container
      cardContainer.prepend(gameInfo);
      cardContainer.appendChild(createCards(numOfCards));
      // Switch to player 2's turn
      playersTurn = 2;
      canClick = true;
      // gameInfo.innerText = "Its player 2 turn. Click to draw a card!";
      output("It's player 2 turn. Click to draw a card!");
    }, 1);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    // Pop player 2's card metadata from the deck
    setTimeout(() => {
      cardContainer.prepend(gameInfo);
      cardContainer.appendChild(createCards(numOfCards));

      // Switch to player 1's turn
      playersTurn = 1;
      canClick = true;
      numOfCards = Math.floor(Math.random() * 3 + 2);
      // Determine and output winner
      if (player1RankDifference > player2RankDifference) {
        output("Player 1 wins");
      } else if (player1RankDifference < player2RankDifference) {
        output("Player 2 wins");
      } else {
        output("It's a tie");
      }
    }, 50);
  }
};

initGame();