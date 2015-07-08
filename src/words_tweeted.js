/*
  Global var declaration
*/
var inputFile = process.argv[2] || '../tweet_input/tweets.txt';
var outputFile = process.argv[3] || '../tweet_output/ft1.txt';

var fs = require('fs');
var readable = fs.createReadStream(inputFile, {encoding: 'utf8'});

var wordCounter = {}; //dictionary, the words are the keys, and their counts are values

/*
	Algorithm:
	1. We read the file, and for each tweet, we split the text into words by ' '
	2. For each word, we save it and increment the count using the dictionary wordCounter object
	3. After the tweets are all read, we get the list of keys from wordCounter and sort the list
	4. We loop through the sorted list, and write to ft1.txt
	NOTE: In a real world scenario, instead of saving everything to a string, I would just append
				each word to the end of the file. However, for testing purpose, I decided to write a big 
				string instead. This is just for testing this feature. 
*/
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

readable.on('end', function(){
	var keys = Object.keys(wordCounter);
	keys = keys.sort();

	// For testing purpose, save everything to a string and overwrite the file
	var stringToFile = '';
	keys.forEach(function(key){
		//fs.appendFile(outputFile, key+' '+wordCounter[key]+'\n'); //in a real life situation this is how I would write to the file
		stringToFile += key+' '+wordCounter[key]+'\n';
	})
	// For testing purpose, save everything to a string and overwrite the file
	fs.writeFile(outputFile, stringToFile);
})