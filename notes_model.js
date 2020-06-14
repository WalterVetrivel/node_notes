const fs = require('fs');

class Note {
	static fileName = 'notes.json';

	constructor(title, body) {
		this.title = title;
		this.body = body;
	}

	static setFileName(fName) {
		Note.fileName = fName;
	}

	static readNotes() {
		try {
			const notes = JSON.parse(fs.readFileSync(Note.fileName, 'utf-8'));
			return notes;
		} catch (e) {
			return [];
		}
	}

	static writeNotes(notes) {
		fs.writeFileSync(Note.fileName, JSON.stringify(notes));
	}

	save() {
		const notes = Note.readNotes();

		const newNote = {
			title: this.title,
			body: this.body,
		};

		notes.push(newNote);
		Note.writeNotes(notes);
		return newNote;
	}

	static removeByTitle(title) {
		try {
			const notes = Note.readNotes();
			const newNotes = notes.filter(note => note.title !== title);
			Note.writeNotes(newNotes);
		} catch (e) {
			throw e;
		}
	}

	static readByTitle(title) {
		const notes = Note.readNotes();
		const note = notes.find(note => note.title === title);
		return note;
	}

	static getNotes() {
		const notes = Note.readNotes();
		return notes;
	}
}

module.exports = Note;
