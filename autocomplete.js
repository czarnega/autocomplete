'use strict';

const fs = require('fs');
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
	var trailingSymbol = /[.,!:=;?]$/g;

	console.log('Starting to add words in trie');
	readStream.on('data', function(data) {
		remaining += data;
		var index = remaining.indexOf(' ');
		var last  = 0;
		while (index > -1) {
		  var line = remaining.substring(last, index).trim().toLowerCase().replace(/[\']/g,'');
		  last = index + 1;
		  var notValid = validWord.test(line);
		  if(!notValid && line.length > 0){
		  	line = line.replace(trailingSymbol,'')
		  	// dictionary[line] = dictionary[line] ? dictionary[line]++ : 1;
		  	suggestTree.add(line);
		  }
		  index = remaining.indexOf(' ', last);
		}
		remaining = remaining.substring(last).trim().toLowerCase();
	});

	readStream.on('end', function() {
		var notValid = validWord.test(remaining);
	  if (!notValid && remaining.length > 0) {
	  	remaining = remaining.replace(trailingSymbol,'')
	    suggestTree.add(remaining);
	  }
		cb(null, suggestTree);
	});
}

module.exports = autoComplete;
