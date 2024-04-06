'use strict';
const chalk = (await import('chalk')).default

export const log = (message) => {
  if (typeof message === 'string') {
    console.log(chalk.white.bgGreen.bold(`✔ ${message}`));
  } else {
    console.log(chalk.white.bgGreen.bold(`${message}`));
  }
};

export const error = (message) => {
  if (typeof message === 'string') {
    console.log(chalk.red.bgBlue.bold(`✘ ${message}`));
  } else {
    console.log(chalk.red.bgBlue.bold(`${message}`));
  }
};

export const info = (message) => {
  if (typeof message === 'string') {
    console.log(chalk.yellow.bgRed.bold(`✘ ${message}`));
  } else {
    console.log(chalk.yellow.bgRed.bold(`${message}`));
  }
};
