var fs = require('fs');
var autoComplete = require('./autoComplete');

console.log('Welcome to AutoCompleter');
console.log('Starting file scraper...')

// Sample txt files used for testing purposes
var test = 'test.txt';
var testExcerpt = 'testExcerpt.txt';
var shakespeare = 'shakespeare-complete.txt';

// Options object which specifies source file, number of results to display,
// and if results should be displaying in descending or ascending order.
const opts = {
  file: shakespeare,
  results: 25,
  descending: true
};

autoComplete(opts, function(err,suggestTree){
  if (err) throw err;
  getResults(suggestTree);
})

function getResults(tree) {
 var stdin = process.stdin, stdout = process.stdout;
 
 stdin.resume();
 stdout.write("Word to search for? ");
 
 stdin.once('data', function(data) {
   data = data.toString().trim().toLowerCase();
 
   if (/[a-z]/.test(data)) {
     var results = tree.getWords(data,opts.results,opts.descending);
     console.log('Results for ',data);
     console.log(results)
     var callback = getResults.bind(null,tree);
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

  stdin.once('data', function(data) {
    data = data.toString().trim().toLowerCase();
  
    if (data == 'y') {
      callback();
    } else {
      stdout.write('Thanks for using Autocomplete. Goodbye!');
      process.exit();
    }
  });
}