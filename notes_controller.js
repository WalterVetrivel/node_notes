const chalk = require('chalk');

const Note = require('./notes_model');

const postNote = argv => {
	try {
		const note = new Note(argv.title, argv.body);
		const newNote = note.save();
		console.log(
			chalk.green(
				`Note saved. Created note: \n${chalk.yellow.bold('Title:')} ${
					newNote.title
				}\n${chalk.yellow.bold('Body:')} ${newNote.body}`
			)
		);
	} catch (e) {
		console.log(chalk.red('Creating note failed.'));
	}
};

const deleteNote = argv => {
	try {
		Note.removeByTitle(argv.title);
		console.log(chalk.redBright('Note removed.'));
	} catch (e) {
		console.log(chalk.red('Unable to fetch note.'));
	}
};

const getNote = argv => {
	try {
		const note = Note.readByTitle(argv.title);
		if (note) {
			console.log(note);
		} else {
			console.log(chalk.red('Note not found.'));
		}
	} catch (e) {
		console.log(chalk.red('Unable to fetch note.'));
	}
};

const getNotes = () => {
	try {
		const notes = Note.getNotes();
		notes.forEach((note, i) => {
			console.log(`${chalk.blueBright.bold(`Note #${i + 1}`)}`);
			console.log(
				chalk.green(
					`${chalk.yellow.bold('Title:')} ${note.title}\n${chalk.yellow.bold(
						'Body:'
					)} ${note.body}\n`
				)
			);
		});
	} catch (e) {
		console.log(chalk.red('Unable to fetch notes.'));
	}
};

module.exports = { postNote, deleteNote, getNote, getNotes };
