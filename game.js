'use strict';

const prompt = require('prompt');

// Chris - Global variable to control if the game is still ongoing or if it has ended.
let isGameOver = false;

// Chris - Here's a basic setup for stacks to use during the game.  Might not be best as an array, but it was the easiest for me to get started with.
// Refactoring into a different data type shouldn't be too tough if needed.
const stacks = [
  {
    name: 1,
    numberOfItems: 10,
  },
  {
    name: 2,
    numberOfItems: 7,
  },
  {
    name: 3,
    numberOfItems: 8,
  },
];

// Chris - a tally to keep track of how many items are left game-wide accross all stacks. 
// When this is zero, game is over.
let totalItemsRemaining;

// Chris - this function tallies a new total for totalItemsRemaining after a player makes a valid move.
// would change if we go to something other than an array to store the stacks.
const _tallyTotalItemsRemaining = () => {
  totalItemsRemaining = stacks.reduce((acc, cur) => {
    return acc + cur.numberOfItems;
  }, 0);
};

// Chris - sets initial state for totalItemsRemaining.  
// Typically this only runs inside the takeItemsFromStack function to ensure it is consistently updated during gameplay.
_tallyTotalItemsRemaining();

// Chris - This applies the player's move to the stack they selected, and updates totalRemainingItems.
// I'm subtracting 1 from the stackNumber to keep indexing simpler from a player's perpective (I doubt they'd choose to take from stack 0)
// would change if we go to something other than an array to store the stacks.
const takeItemsFromStack = (stackNumber, numberToTake) => {
  stacks[stackNumber - 1].numberOfItems = stacks[stackNumber - 1].numberOfItems - numberToTake;
  _tallyTotalItemsRemaining();
};

// Chris - checks and validates the players' inputs.
const checkChoices = (stackNumber, numberToTake) => {
  // checks and validation for stackNumber
  if(typeof stackNumber !== 'number') {
    stackNumber = parseInt(stackNumber);
  }
  if(isNaN(stackNumber) || stackNumber > stacks.length) {
    console.log('Invalid stack choice');
    return false;
  }
  
  // checks and validation for numberToTake
  if(typeof numberToTake !== 'number') {
    numberToTake = parseInt(numberToTake);
  }
  if(isNaN(numberToTake) || numberToTake < 1 || numberToTake > stacks[stackNumber - 1].numberOfItems) {
    console.log('Invalid numberToTake choice');
    return false;
  }

  // Chris - if all the above is good, return true to continue gameplay loop
  return true;
};

// Chris - used to end the game when totalRemainingItems is empty
const checkForGameOver = () => {
  if(totalItemsRemaining === 0) {
    isGameOver = true;
  }
  else {
    return;
  }
};

// Chris - this controls the prompt, and calls the gameCycle with the inputs.
const getInput = () => {
  console.log({stacks});
  prompt.start();
  prompt.get(['stack', 'number'], (err, data) => {
    if(err) {
      throw new Error(err);
    }
    let stackNumber = data.stack;
    let numberToTake = data.number;
    gameCycle(stackNumber, numberToTake);
  });
};

// Chris - Here is the gameplay loop. This continues until totalRemainingItems is 0, which changes isGameOver to false.
const gameCycle = (stackNumber, numberToTake) => {
  if(checkChoices(stackNumber, numberToTake) === true) {
    takeItemsFromStack(stackNumber, numberToTake);
  }
  checkForGameOver();
  if(isGameOver === false) {
    console.log({totalItemsRemaining});
    getInput();
  }
  else {
    console.log('GAME OVER!!!!!!!');
  }
};

// Chris - This gets the party started!!!
getInput();