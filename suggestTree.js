'use strict';

class Node {
	constructor(value){
		this.value = value;
		this.children = {};
		this.isLeaf = false;
	}
}

class SuggestTree {
	constructor(){
		this.root = new Node(null);
	}

	add(word){
		var ptr = this.root;
		for (var i = 0; i < word.length; i++) {
			if (!ptr.children[word[i]]) {
				ptr.children[word[i]] = new Node(word[i]);
			}
			ptr = ptr.children[word[i]];
		}
		ptr.isLeaf = true;
	}

	getAllWords(){
		var result = [];

		function traverse(node, path, length) {
			if (!node) return;

			if (node.value) path[length++] = node.value;

			if (node.isLeaf) result.push(path.join(""));
			
			Object.keys(node.children).forEach(function(key){
				traverse(node.children[key], path, length);
			});
		}

		traverse(this.root, [], 0);
		return result;
	}

	getWords(key, limit){
		var result = [];
		var ptr = this.root;
		var prefix = key.slice(0, key.length - 1);

		if (!key || !key.length) return result;

		for (var i = 0; i < key.length; i++) {
			if (ptr.children[key[i]]) {
				ptr = ptr.children[key[i]];
			} else {
				return result;
			}
		}

		function traverse(node, path, length) {
			if (!node) return;

			if (node.value) path[length++] = node.value;

			if (node.isLeaf) result.push(prefix + path.join(""));

			if (limit && result.length >= limit) return;
			
			Object.keys(node.children).forEach(function(key){
				traverse(node.children[key], path, length);
			});
		}

		traverse(ptr, [], 0);
		return result;
	}
}

module.exports = SuggestTree;


// var suggestTree = function (tokenArray) {
//     console.log('suggestTree called')
//     var createLetterObject = function (l) {
//         var pChildren = [];

//         var getMatchingWords = function (characterArr, availableWords, children) {
//             if (characterArr.length === 0) {
//                 for (var child in children) {
//                     if ({}.hasOwnProperty.call(children, child)) {
//                         var currentChild = children[child];

//                         var words = currentChild.getWords(characterArr);

//                         for (var pos in words) {
//                             if ({}.hasOwnProperty.call(words, pos)) {
//                                 availableWords.push(words[pos]);
//                             }
//                         }

//                         if (currentChild.word) {
//                             availableWords.push(currentChild.word);
//                         }
//                     }
//                 }
//             } else {
//                 var currentCharacter = characterArr.pop();
//                 getMatchingWords(characterArr, availableWords, children[currentCharacter].children);
//             }
//         };

//         function doGetWords(wordPart) {
//             var len = wordPart.length;
//             var ar = [];
//             var wordList = [];

//             for (var ii = len - 1; ii >= 0; ii --) {
//                 ar.push(wordPart[ii].toUpperCase());
//             }

//             getMatchingWords(ar, wordList, pChildren);

//             return wordList;
//         }

//         return {
//             letter: l,
//             children: pChildren,
//             parent: null,
//             word: null,
//             getWords: doGetWords
//         };
//     };

//     var startingPoint = createLetterObject();

//     function parseWord(wordCharacterArray, parent, fullWord) {
//         if (wordCharacterArray.length === 0) {
//             parent.word = fullWord;
//             return;
//         }

//         var currentCharacter = wordCharacterArray.pop().toUpperCase();

//         if (!parent.children[currentCharacter]) {
//             parent.children[currentCharacter] = createLetterObject(currentCharacter);
//         }

//         parseWord(wordCharacterArray, parent.children[currentCharacter], fullWord);
//     }

//     for (var counter in tokenArray) {
//         if ({}.hasOwnProperty.call(tokenArray, counter)) {
//             var word = tokenArray[counter];

//             if (!word) {
//                 continue;
//             }

//             var ar = [];

//             var wordLength = word.length;

//             for (var ii = wordLength - 1; ii >= 0; ii--) {
//                 ar.push(word[ii]);
//             }

//             parseWord(ar, startingPoint, word);
//         }
//     }

//   return startingPoint;
// };


// var tokens = ["Token", "words", "whohaa", "mommy", "test", "wicked"];
// var tree = suggestTree(tokens);

// module.exports = {
//     suggestTree: suggestTree
// }

// var currentTokenSet = 'w'; 
// var list = tree.getWords(currentTokenSet);

// it will return words,whohaa,wicked.
// console.log(list) 