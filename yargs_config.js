const yargs = require('yargs');

const {
	getNote,
	getNotes,
	postNote,
	deleteNote,
} = require('./notes_controller');

// Customise yargs
yargs.version('1.1.0');

// yargs commands - add, remove, read, list
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string',
		},
	},
	handler: postNote,
});

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	handler: deleteNote,
});

yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
	},
	handler: getNote,
});

yargs.command({
	command: 'list',
	describe: 'List notes',
	handler: getNotes,
});

module.exports = yargs;