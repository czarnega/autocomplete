'use strict';

const AutoComplete = require('./lib/autocomplete');

console.log('Welcome to AutoCompleter');
console.log('Starting file scraper...')

// Sample txt files used for testing purposes
const test = './data/test.txt';
const testExcerpt = './data/testExcerpt.txt';
const shakespeare = './data/shakespeare-complete.txt';

// Options object which specifies source file, number of results to display,
// and if results should be displaying in descending or ascending order.
const options = {
  file: shakespeare,
  resultLimit: 25,
  descending: true
};

AutoComplete(options, (err,suggestTree) => {
  if (err) throw err;
  getResults(suggestTree, options);
});

function getResults(tree, { resultLimit, descending }) {
 var stdin = process.stdin, stdout = process.stdout;
 
 stdin.resume();
 stdout.write("Word to search for? ");
 
 stdin.once('data', data => {
   data = data.toString().trim().toLowerCase();
 
   if (/[a-z]/.test(data)) {
     var results = tree.getMatches(data,resultLimit,descending);
     console.log('Results for ',data);
     console.log(results)
     var callback = getResults.bind(null,tree, { resultLimit, descending });
     closeQuery(callback);
   } else {
     stdout.write("Autocomplete only accepts letter characters\n");
     getResults(tree);
   }
 });
}

function closeQuery(callback){
  var stdin = process.stdin, stdout = process.stdout;
  
  stdin.resume();
  stdout.write('Autocomplete again? (y/n)');

  stdin.once('data', data => {
    data = data.toString().trim().toLowerCase();
  
    if (data == 'y') {
      callback();
    } else {
      stdout.write('Thanks for using Autocomplete. Goodbye!');
      process.exit();
    }
  });
}