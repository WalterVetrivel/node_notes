const chalk = require('chalk');

// Function to display a note
const displayNote = (note, newLine = false) => {
	console.log(`${chalk.blueBright.bold(`ID #${note.id}`)}`);
	console.log(
		chalk.green(
			`${chalk.yellow.bold('Title:')} ${note.title}\n${chalk.yellow.bold(
				'Body:'
			)} ${note.body}`
		)
	);
	if (newLine) {
		console.log();
	}
};

// Function do display delete message
const displayDelete = msg => {
	console.log(chalk.redBright(msg));
};

// Function to display a success message
const displaySuccess = msg => {
	console.log(chalk.green(msg));
};

// Function to display an error message
const displayError = msg => {
	console.log(chalk.red(msg));
};

module.exports = { displayNote, displaySuccess, displayError, displayDelete };
