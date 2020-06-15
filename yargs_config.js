const yargs = require('yargs');

const {
	getNote,
	getNotes,
	postNote,
	deleteNote,
	patchNote,
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
	builder: {
		title: {
			describe: 'Note title',
			type: 'string',
		},
		id: {
			describe: 'Note ID',
			type: 'number',
		},
	},
	handler: deleteNote,
});

yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Note title',
			type: 'string',
		},
		id: {
			describe: 'Note ID',
			type: 'number',
		},
	},
	handler: getNote,
});

yargs.command({
	command: 'list',
	describe: 'List notes',
	handler: getNotes,
});

yargs.command({
	command: 'modify',
	describe: 'Modify a note',
	builder: {
		id: {
			describe: 'Note ID',
			demandOption: true,
			type: 'number',
		},
		title: {
			describe: 'Note title',
			type: 'string',
		},
		body: {
			describe: 'Note body',
			type: 'string',
		},
	},
	handler: patchNote,
});

module.exports = yargs;
