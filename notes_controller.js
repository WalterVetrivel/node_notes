const chalk = require('chalk');

const Note = require('./notes_model');

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

// Handler to get a single note
const getNote = argv => {
	try {
		let note;

		if (argv.id) {
			note = Note.readById(argv.id);
		} else if (argv.title) {
			note = Note.readByTitle(argv.title);
		} else {
			console.log(chalk.red('Please provide an ID or a title to read.'));
			return;
		}

		if (note) {
			displayNote(note);
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
		notes.forEach(note => {
			displayNote(note);
		});
	} catch (e) {
		console.log(chalk.red('Unable to fetch notes.'));
	}
};

const postNote = argv => {
	try {
		const note = new Note(argv.title, argv.body);
		const newNote = note.save();
		console.log(chalk.green(`Note saved. Created note:`));
		displayNote(newNote);
	} catch (e) {
		console.log(chalk.red('Creating note failed.'));
	}
};

const deleteNote = argv => {
	try {
		if (argv.id) {
			Note.removeById(argv.id);
		} else if (argv.title) {
			Note.removeByTitle(argv.title);
		} else {
			console.log(chalk.red('Please provide an ID or a title to read.'));
			return;
		}

		console.log(chalk.redBright('Note removed.'));
	} catch (e) {
		console.log(chalk.red('Unable to remove note.'));
	}
};

module.exports = { postNote, deleteNote, getNote, getNotes };
