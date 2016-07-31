'use strict';

// Node class represents both prefix nodes and complete words in
// SuggestTree 
class Node {
	constructor(value){
		this.value = value;
		this.children = {};
		this.isLeaf = false;
		this.frequency = 0;
	}
}

// SuggestTree class is a trie data structure where all leaf nodes 
// are complete words
class SuggestTree {
	constructor(){
		this.root = new Node(null);
	}
	// Method to add word to SuggestTree
	add(word){
		let pointer = this.root;
		for (let i = 0; i < word.length; i++) {
			if (!pointer.children[word[i]]) {
				pointer.children[word[i]] = new Node(word[i]);
			}
			pointer = pointer.children[word[i]];
		}
		pointer.isLeaf = true;
		pointer.frequency++;
		pointer = this.root;
	}
	// Method to get all words in SuggestTree
	getDictionary(){
		const results = [];

		// IIFE which traverses trie and pushes all leaf nodes into results
		(function traverse(node, path, length) {
			if(!node){
				return
			};

			if(node.value){
				path[length++] = node.value;
			}

			if(node.isLeaf){
				let word = prefix + path.join("");
				results.push({ word: word, frequency: node.frequency })
			};
			
			Object.keys(node.children).forEach(key => {
				traverse(node.children[key], path.slice(), length);
			});
		}(this.root, [], 0));

		return results;
	}
	// Method to get words matching specific token, accepts a limit 
	// parameter delimiting number of results to return (default 50).
	getMatches(token, limit = 50, descending){
		let results = [],
			pointer = this.root,
			prefix = token.slice(0, token.length - 1);

		// If no token/token with no characters given, return empty array
		if (!token || !token.length) return results;

		// For loop to check if the token exists in the trie,
		// if not, returns empty array
		for (let i = 0; i < token.length; i++) {
			if (pointer.children[token[i]]) {
				pointer = pointer.children[token[i]];
			} else {
				return results;
			}
		}

		// IIFE which traverses trie and finds all matches(leaf nodes)
		(function traverse(node, path, length){
			if(!node){
				return
			};

			if(node.value){
				path[length++] = node.value;
			}

			if(node.isLeaf){
				let word = prefix + path.join("");
				results.push({ word: word, frequency: node.frequency })
			};
			
			Object.keys(node.children).forEach(key => {
				traverse(node.children[key], path.slice(), length);
			});
		}(pointer, [], 0));

		return results.sort((a,b) => (
			descending ? (b.frequency - a.frequency) : (a.frequency - b.frequency)
		)).slice(0,limit);
	}
}

module.exports = SuggestTree;
