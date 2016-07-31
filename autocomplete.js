'use strict';

const fs = require('fs');
const readline = require('readline');
const SuggestTree = require('./suggestTree');

const DEFAULT_FILE = 'testExcerpt.txt';

// callback is a callback function with (error,treeObject) params
function autoComplete(options, callback) {
	if (!callback) {
		callback = options;
		options = {};
	}
	var file = options.file || DEFAULT_FILE;
	// returns a ReadStream object
	var readStream = fs.createReadStream(file, {
	  defaultEncoding: 'utf8',
	  autoClose: true
	});

	var suggestTree = new SuggestTree();

	var validWord = new RegExp(/[0-9\/#!$%\^&\*;{}=\_`~()]+/ig);
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
			callback(null, suggestTree);
		});
	}
	catch (err) {
		callback(err, null);
	}
}

module.exports = autoComplete;
