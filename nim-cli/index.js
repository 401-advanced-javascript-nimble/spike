#!/usr/bin/env node

const figlet = require('figlet');
const prompts = require('prompts');
const program = require('commander');

let user;

function init() {
  console.log(
    figlet.textSync('NIM', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    })
  );
}

/**
 * Signup
 */
program
  .command('signup')
  .action(async () => {
    user = await prompts([
      {
        type: 'text',
        name: 'username',
        message: 'Choose a username',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Choose a password',
      },
    ]);

    console.log(`The account was created`);
  })
  .description('Create a new account');

/**
 * Login
 */
program
  .command('login')
  .action(async () => {
    user = await prompts([
      {
        type: 'text',
        name: 'username',
        message: 'Enter your username',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password',
      },
    ]);

    console.log(`Hi ${user.username}!`);
  })
  .description('Login into your player account');

/**
 * Logout
 */
program
  .command('logout')
  .action(async () => {
    user
      ? console.log('Goodbye')
      : console.log('you need to be logged in to logout');
  })
  .description('Logout from the current account');

/**
 * Play
 */
program
  .command('play')
  .action(async () => {
    require('../game.js');
  })
  .description('Join or create a new game');

/**
 * Leaderboard
 */
program
  .command('leaderboard')
  .action(async () => {
    const results = [
      {
        player: 'Player A',
        score: 100,
      },
      {
        player: 'Player B',
        score: 90,
      },
      {
        player: 'Player C',
        score: 80,
      },
    ];
    console.table(results);
  })
  .description('Show who\'s the best');

async function run() {
  init();
  program.parse(process.argv);
}

run();
