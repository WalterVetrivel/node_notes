const Note = require('./notes_model');
const {
	displayNote,
	displaySuccess,
	displayError,
	displayDelete,
} = require('./utils');

// Handler to get a single note
const getNote = argv => {
	try {
		let note;

		if (argv.id) {
			note = Note.readById(argv.id);
		} else if (argv.title) {
			note = Note.readByTitle(argv.title);
		} else {
			displayError('Please provide an ID or a title to read.');
			return;
		}

		if (note) {
			displayNote(note);
		} else {
			displayError('Note not found.');
		}
	} catch (e) {
		displayError('Unable to fetch note.');
	}
};

// Handler to get all notes
const getNotes = () => {
	try {
		const notes = Note.getNotes();
		notes.forEach(note => {
			displayNote(note, true);
		});
	} catch (e) {
		displayError('Unable to fetch notes.');
	}
};

// Handler to create a new note
const postNote = argv => {
	try {
		const note = new Note(argv.title, argv.body);
		const newNote = note.save();
		displaySuccess(`Note saved. Created note:`);
		displayNote(newNote);
	} catch (e) {
		console.log(e);
		displayError('Creating note failed.');
	}
};

// Handler to delete a note
const deleteNote = argv => {
	try {
		if (argv.id) {
			Note.removeById(argv.id);
		} else if (argv.title) {
			Note.removeByTitle(argv.title);
		} else {
			displayError('Please provide an ID or a title to read.');
			return;
		}

		displayDelete('Note removed.');
	} catch (e) {
		displayError('Unable to remove note.');
	}
};

// Handler to update a note
const patchNote = argv => {
	try {
		if (!argv.id) {
			displayError('Please provide an ID to update.');
			return;
		}
		if (!argv.title && !argv.body) {
			displayError('Please provide a new title or body.');
			return;
		}
		if (Note.exists(argv.id)) {
			const note = Note.readById(argv.id);

			if (argv.title) note.title = argv.title;
			if (argv.body) note.body = argv.body;

			const updatedNote = note.save();
			displaySuccess(`Note saved. Updated note:`);
			displayNote(updatedNote);
		}
	} catch (e) {
		displayError('Unable to update note.');
	}
};

module.exports = { postNote, deleteNote, getNote, getNotes, patchNote };
