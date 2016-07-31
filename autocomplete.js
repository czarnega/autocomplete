'use strict';

const fs = require('fs');
const readline = require('readline');
const SuggestTree = require('./suggestTree');

const DEFAULT_FILE = 'testExcerpt.txt';

// cb is a callback function with error,success params
function autoComplete(opts, cb) {
	if (!cb) {
		cb = opts;
		opts = {};
	}
	var file = opts.file || DEFAULT_FILE;
	// returns a ReadStream object
	var readStream = fs.createReadStream(file, {
	  defaultEncoding: 'utf8',
	  autoClose: true
	});

	var suggestTree = new SuggestTree();

	var remaining = '';
	var validWord = new RegExp(/[0-9\/#!$%\^&\*;{}=\_`~()]+/ig);
	// var validWord = new RegExp(/^[a-z]*$/);
	var trailingSymbol = /[.,!:=;?]$/g;

	const rl = readline.createInterface({
	  input: readStream
	});

	try {
		rl.on('line', (line) => {
			line = line.trim();
		  var words = line.split(' ');
		  while(words.length > 0){
		  	var word = words.pop();
		  	word = word.replace(trailingSymbol,'');
		  	word = word.toLowerCase();
		  	if(!validWord.test(word)){
		  		suggestTree.add(word);	  		
		  	}
		  }
		});

		rl.on('close', () => {
			cb(null, suggestTree);
		});
	}
	catch (err) {
		cb(err, null);
	}
}

module.exports = autoComplete;
