# autocomplete
Autocomplete library which builds a dictionary based on input text file and uses no external libraries.

Autocomplete Problem
====================

Create a Ruby library that can autocomplete word fragments using a text file as the data source.

* You should be able to index the autocomplete-able words from any text file (feel free to ignore non-word entities like numbers)
* When returning the list of autocompleted words for a word fragment, it should order the words by their frequency (most frequent first)
* It should also return the frequency of each word as part of the results
* It should return no more than 25 results for any word fragment
* Use the provided complete works of Shakespeare and include your results for the following fragments: th, fr, pi, sh, wu, ar, il, ne, se, pl

There are various decisions and minor differences that go into different solutions, so don't worry about precise results matching up with our own – we're not going to evaluate it like that. Also, I'm not going to give you specific class/module structure since I think these decisions are part of the problem. We'll be evaluating your solution based on your approach to the problem (algorithm), readability/maintainability/style, and performance characteristics. Only include any tests if it helps you, we won't penalize or judge you for not having them. 

Just send back a tar'd gzip of your solution, with any instructions if necessary with how to use it. If you have any questions, feel free to Skype or email me.

NOTE: You must use pure Ruby - no third-party gems, data stores, etc. However, feel free to use any reference resources, just make sure to cite anything you use (aside from the obvious Ruby docs, etc).
--------------

Resources used: 
* [John Resig, Revised JavaScript Dictionary Search](http://ejohn.org/blog/revised-javascript-dictionary-search/)
* [TopCoder Using Tries](https://www.topcoder.com/community/data-science/data-science-tutorials/using-tries/)
* [StackOverflow Autocomplete Using a Trie](http://stackoverflow.com/questions/5023141/autocomplete-using-a-trie)

* http://igoro.com/archive/efficient-auto-complete-with-a-ternary-search-tree/
* http://pushinginertia.com/2014/09/efficient-typeahead-autocomplete-data-structure-algorithm/
* http://suggesttree.sourceforge.net/
* http://st-on-it.blogspot.no/2011/05/how-to-read-user-input-with-nodejs.html

