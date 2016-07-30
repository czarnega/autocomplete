var fs = require('fs');
var autoComplete = require('./autoComplete');
var tree = {};
var words = [];
// var file = 'shakespeare-complete.txt';

console.log('Welcome to AutoCompleter');
console.log('Starting file scraper...')

const opts = {
  file: 'testExcerpt.txt'
};

autoComplete(opts, function(err,suggestTree){
  if (err) throw err;
  getResults(suggestTree);
})

// // returns a ReadStream object
// var readStream = fs.createReadStream(file, {
//   defaultEncoding: 'utf8',
//   autoClose: true
// });

// // define function to pass into readWords
// var testFunc = function(str){
//   console.log('Line: ',str);
// }

function getResults(tree) {
 var stdin = process.stdin, stdout = process.stdout;
 
 stdin.resume();
 stdout.write("Word to search for? ");
 
 stdin.once('data', function(data) {
   data = data.toString().trim().toLowerCase();
 
   if (/[a-z]/.test(data)) {
     var results = tree.getWords(data);
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

// readWords(readStream,testFunc);

// function readWords(inputStream, callback) {
// 	var dictionary = {};
//   var wordObjects = [];
//   var remaining = '';
//   var counter = 0;
//   var validWord = new RegExp(/[0-9\/#!$%\^&\*;{}=\_`~()]+/ig);
//   var trailingSymbol = /[.,!:=;?]$/g;

//   inputStream.on('data', function(data) {
//     remaining += data;
//     var index = remaining.indexOf(' ');
//     var last  = 0;
//     while (index > -1) {
//       var line = remaining.substring(last, index).trim().toLowerCase().replace(/[\']/g,'');
//       last = index + 1;
//       var notValid = validWord.test(line);
//       if(!notValid && line.length > 0){
//       	line = line.replace(trailingSymbol,'')
//       	dictionary[line] = dictionary[line] ? dictionary[line]++ : 1;
//       	callback(line);
//       	counter++;
//       }
//       index = remaining.indexOf(' ', last);
//     }
//     remaining = remaining.substring(last).trim().toLowerCase();
//   });

//   inputStream.on('end', function() {
//   	var notValid = validWord.test(remaining);
//     if (!notValid && remaining.length > 0) {
//     	remaining = remaining.replace(trailingSymbol,'')
//       callback(remaining);
//       counter++; 
//     }
//     // console.log('word count: ',counter)
//     // console.log('dictionary length: ',Object.keys(dictionary).length)
//     // for(var key in dictionary){
//     //   wordObjects.push({ word: key, count: dictionary[key] })
//     // }
//     words = Object.keys(dictionary);
//     // console.log('words: ',words)
//     tree = suggestTree(words);
//     console.log('Scraping complete. Autocomplete ready!')
//     getResults();
//   });
// }
