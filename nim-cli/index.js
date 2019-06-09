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
 * Login
 */
program.command('login').action(async () => {
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
});

/**
 * Logout
 */
program.command('logout').action(async () => {
  user
    ? console.log('Goodbye')
    : console.log('you need to be logged in to logout');
});

async function run() {
  init();
  program.parse(process.argv);
}

run();
