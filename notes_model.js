const fs = require('fs');

class Note {
	static fileName = 'notes.json';

	constructor(title, body, id = null) {
		const notes = Note.readNotes();

		if (!id) {
			this.id = notes.length + 1;
			this.isNew = true;
		} else {
			this.id = id;
			this.isNew = false;
		}
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

	static exists(id) {
		const notes = Note.readNotes();
		return notes.findIndex(note => note.id === id) >= 0;
	}

	save() {
		const notes = Note.readNotes();
		const newNote = {
			id: this.id,
			title: this.title,
			body: this.body,
		};

		if (this.isNew) {
			notes.push(newNote);
		} else {
			const noteIndex = notes.findIndex(note => note.id === this.id);
			notes.splice(noteIndex, 1);
			notes.splice(noteIndex, 0, newNote);
		}

		Note.writeNotes(notes);
		return newNote;
	}

	static removeById(id) {
		try {
			const notes = Note.readNotes();
			const newNotes = notes.filter(note => note.id !== id);
			Note.writeNotes(newNotes);
		} catch (e) {
			throw e;
		}
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

	static readById(id) {
		const notes = Note.readNotes();
		const note = notes.find(note => note.id === id);

		if (note) {
			return new Note(note.title, note.body, note.id);
		} else {
			return null;
		}
	}

	static readByTitle(title) {
		const notes = Note.readNotes();
		const note = notes.find(note => note.title === title);

		if (note) {
			return new Note(note.title, note.body, note.id);
		} else {
			return null;
		}
	}

	static getNotes() {
		const notes = Note.readNotes();
		return notes.map(note => new Note(note.title, note.body, note.id));
	}
}

module.exports = Note;
