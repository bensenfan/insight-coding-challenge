var fs = require('fs');
var readable = fs.createReadStream('../tweet_input/tweets.txt', {encoding: 'utf8'});

var wordCounter = {}; //dictionary, the words are the keys, and their counts are values

readable.on('data', function(data){
	var tweets = data.split('\n');

	for (line in tweets) {
		var tweet = tweets[line];
		var words = tweet.split(' ');

		for (counter in words){
			var word = words[counter];
			if (wordCounter[word]){
				wordCounter[word]++;
			} else {
				wordCounter[word] = 1;
			}
		};
	}
})

/*
	When the file is finished being read, we want to write a sorted object to the result file
	To do this, we obtain the list of keys in wordCounter, sort the keys, create a string 
		using the sorted keys and their values, and write the string
	This way we only sort and write once
*/
readable.on('end', function(){
	var keys = Object.keys(wordCounter);
	keys = keys.sort();

	var stringToFile = '';

	keys.forEach(function(key){
		stringToFile += key + ' ' + wordCounter[key] + '\n';
	})

	fs.writeFile('../tweet_output/ft1.txt', stringToFile);
})