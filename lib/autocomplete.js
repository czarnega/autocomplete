'use strict';

const fs = require('fs');
const readline = require('readline');
const SuggestTree = require('./suggestTree');

const DEFAULT_FILE = '../data/testExcerpt.txt';

// callback is a callback function with (error,treeObject) params
function autoComplete(options, callback) {
	if (!callback) {
		callback = options;
		options = {};
	}
	const file = options.file || DEFAULT_FILE;
	// returns a ReadStream object
	const readStream = fs.createReadStream(file, {
	  defaultEncoding: 'utf8',
	  autoClose: true
	});

	let suggestTree = new SuggestTree();

	const validWord = new RegExp(/[0-9\/#!$%\^&\*;{}=\_`~()]+/ig);
	const trailingSymbol = /[.,!:=;?]$/g;

	const rl = readline.createInterface({
	  input: readStream
	});

	try {
		rl.on('line', (line) => {
			line = line.trim();
		  let words = line.split(' ');
		  while(words.length > 0){
		  	let word = words.pop();
		  	word = word.replace(trailingSymbol,'').toLowerCase();
		  	if(!validWord.test(word)){
		  		suggestTree.add(word);	  		
		  	}
		  }
		});

		rl.on('close', () => {
			callback(null, suggestTree);
		});
	}
	catch (err) {
		callback(err, null);
	}
}

module.exports = autoComplete;
