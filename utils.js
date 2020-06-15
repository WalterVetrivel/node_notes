// Function to display a note
const displayNote = note => {
	console.log(`${chalk.blueBright.bold(`ID #${note.id}`)}`);
	console.log(
		chalk.green(
			`${chalk.yellow.bold('Title:')} ${note.title}\n${chalk.yellow.bold(
				'Body:'
			)} ${note.body}`
		)
	);
};

module.exports = { displayNote };
