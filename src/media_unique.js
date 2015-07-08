/*
  Global var declaration
*/
var inputFile = process.argv[2] || '../tweet_input/tweets.txt';
var outputFile = process.argv[3] || '../tweet_output/ft2.txt';

var fs = require('fs');
var readable = fs.createReadStream(inputFile, {encoding: 'utf8'});

var wordCountArray = []; //a sorted list to keep track of unique words counts
var medianArray = []; //keeps track of median, this is for output

/*
  Following two functions obtained a stackoverflow post on inserting into sorted arrays
  http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
*/
function insert(element, array) {
  array.splice(locationOf(element, array) + 1, 0, element);
  return array;
}

function locationOf(element, array, start, end) {
  start = start || 0;
  end = end || array.length;
  var pivot = parseInt(start + (end - start) / 2, 10);
  if (array[pivot] === element) return pivot;
  if (end - start <= 1)
    return array[pivot] > element ? pivot - 1 : pivot;
  if (array[pivot] < element) {
    return locationOf(element, array, pivot, end);
  } else {
    return locationOf(element, array, start, pivot);
  }
}

/*
  Beginning of my own functions
*/ 
function findMedian(half){
  var median = 0; //default value, also indicate median is number
  if (wordCountArray.length%2 === 0) {
    // if there is an even amount of entries
    median = (wordCountArray[half-1] + wordCountArray[half]) / 2;
  } else {
    median = wordCountArray[Math.floor(half)];
  }

  return median;
}

/*
Algorithm:
  1. Scan each tweet, we again use a dictionary to store unique words. 
     This time instead of keep a tally we just store the value as true, 
     since it's the number of keys we're after. 
  2. After a tweet is finished being read, we count the dictionary's 
     number of keys to get the unique word count, and insert this into 
     the wordCountArray, which is the sorted list.
  3. Then we find the median, and save it to the medianArray. After we 
     are done wit hteh entire file, we loop through the medianArray and 
     write to ft2.txt
*/
readable.on('data', function(data){
  var tweets = data.split('\n'); 

  for (line in tweets) {
    var tweet = tweets[line];
    var words = tweet.split(' ');
    var uniqueWords = {}; //use a dictionary to store unique words as key. 

    words.forEach(function(word){
      uniqueWords[word] = true;
    })

    var count = Object.keys(uniqueWords).length;
    
    //insert new count to the right location of wordCountArray so it remains sorted
    insert(count, wordCountArray) 

    // find median
    var median = findMedian(wordCountArray.length/2);
    
    medianArray.push(median);
  }
})

readable.on('end', function(){
  var stringToFile = '';
  medianArray.forEach(function(data){
    //fs.appendFile(outputFile, data+'\n'); //in a real life situation this is how I would write to the file
    stringToFile += data+'\n';
  })
  // For testing purpose, save everything to a string and overwrite the file
  fs.writeFile(outputFile, stringToFile);
})