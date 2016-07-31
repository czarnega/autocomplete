'use strict';

class Node {
	constructor(value){
		this.value = value;
		this.children = {};
		this.isLeaf = false;
		this.frequency = 0;
	}
}

class SuggestTree {
	constructor(){
		this.root = new Node(null);
	}
	// Method to add word to SuggestTree
	add(word){
		var pointer = this.root;
		for (var i = 0; i < word.length; i++) {
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
	getAllWords(cb){
		var result = [];

		function traverse(node, path, length) {
			if (!node) return;

			if (node.value) path[length++] = node.value;

			if (node.isLeaf) result.push(path.join(""));
			
			Object.keys(node.children).forEach(function(key){
				traverse(node.children[key], path.slice(), length);
			});
		}

		traverse(this.root, [], 0);
		return result;
	}
	// Method to get words matching specific token, accepts a limit 
	// parameter delimiting number of results to return (default 25).
	getWords(token, limit = 25){
		var result = [];
		var ptr = this.root;
		var prefix = token.slice(0, token.length - 1);
		console.log('prefix is : ',prefix)

		if (!token || !token.length) return result;

		for (var i = 0; i < token.length; i++) {
			if (ptr.children[token[i]]) {
				ptr = ptr.children[token[i]];
			} else {
				return result;
			}
		}

		function traverse(node, path, length) {
			if(!node){
				return
			};

			if(node.value){
				path[length++] = node.value;
			}

			if(node.isLeaf){
				console.log('path is ',path)
				let word = prefix + path.join("");
				result.push({ word: word, frequency: node.frequency })
			};
			
			Object.keys(node.children).forEach(function(key){
				traverse(node.children[key], path.slice(), length);
			});
		}

		traverse(ptr, [], 0);

		result = result.sort(function(a,b){
			return b.frequency - a.frequency;
		})
		return limit ? result.slice(0,limit) : result;
	}
}

module.exports = SuggestTree;
