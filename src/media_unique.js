var fs = require('fs');
var readable = fs.createReadStream('../tweet_input/tweets_original.txt', {encoding: 'utf8'});

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

readable.on('data', function(data){
  var tweets = data.split('\n'); 

  for (line in tweets) {
    var tweet = tweets[line];
    var words = tweet.split(' ');
    var uniqueWords = {}; //use a dictionary to store unique words as key. 

    for (counter in words){
      var word = words[counter];
      uniqueWords[word] = true;
    };

    var count = Object.keys(uniqueWords).length;
    //insert new count to the right location so wordCountArray remains sorted
    insert(count, wordCountArray) 

    var half = wordCountArray.length/2; 
    var median = 0; //default value, also indicate median is number
    if (wordCountArray.length%2 === 0) {
      // if there is an even amount of entries
      median = (wordCountArray[half-1] + wordCountArray[half]) / 2;
    } else {
      median = wordCountArray[Math.floor(half)];
    }
    
    medianArray.push(median);
  }
})

readable.on('end', function(){
  var stringToFile = '';
  medianArray.forEach(function(data){
    console.log(data);
    stringToFile += data + '\n';
    fs.writeFile('../tweet_output/ft2.txt', stringToFile);
  })
})