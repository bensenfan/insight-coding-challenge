# insight-coding-challenge
Coding challenge for Insight Data Engineering camp

INSTRUCTIONS: 
----------------
This challenge is to implement two features:

1. Calculate the total number of times each word has been tweeted.
2. Calculate the median number of *unique* words per tweet, and update this median as tweets come in. 

FEATURE 1
----------------

Analysis: 
	There are two challenges to scalability:
		1. When we set up the word counter, we don't want to perform unnecessary scanning. That is, we don't want to scan a long list of words for every word in every tweet in order to increment the word count. 

		2. When we save to ft1.txt, we don't want to scan the contents of the file for every tweet in order to add the new counts, especially since the list is suppose to be sorted. 

Solution:
	1. We solve the scanning problem by implementing a dictionary with the words themselves as the keys and their counts as the values. This way, we don't need to search for the word but rather "find" the word directly.

	2. Again, when we write to ft1.txt, we don't want to do write after every line, re-sorting the list along the way. Rather, since we are implementing a dictionary, it's better to aggregate all the word counts, sort the keys, and write to the file using the sorted key list.  

	There are two downsides for using a dictionary: 
	1. This object can theoretically grow indefinitely. With a large enough data set (e.g. billions of tweets), this could be a problem. However, since text is very small to store and memory these days are usually large, this problem likely won't be an issue in most cases. On the other hand, the boost in performance by not having to scan a list for every word far outweighs this potential danger. Alternative solutions are listed below. 
	2. A dictionary, at least in Javascript, isn't sorted. The advantage of scanning for each word is we can keep the list sorted while we increment the count. With  dictionary, we have to sort the list of keys. We do this in Javascript by extracting the list of keys, sort that list, and write to ft1.txt with a loop through the sorted-key list. Again, when the list is too large, this is a problem. Essentially, the trade off is between sorting a potentially large list once and scanning that same list a lot of times. 

	Alternatives:

	1. If a more complex system is allowed, I would probably use a simple key-value database like Redis instead of an in-memory dictionary. This shifts the memory problem to a database that is designed to manage such an issue. The load on the computer would then be very small. However this introduces another layer to the architecture and thus another potential for failure.  
	2. Another possibility is to expand on top of the solution by splitting the dictionary into multiple dictionaries that handles different sets of words. For example, there could be 3 dictionaries objects: one to handle words starting with A-M, one for N-Z, and one for words that start with characters like # and @, which should be separated since these words are essentially miniature sets of the entire alphabet.

FEATURE 2: 
----------------

Analysis:
	The mathematics of calculating median requires a sorted list of word counts. In the example, the set of word counts with the given tweets is {11, 14, 17}. However, should a 4th tweet only contain 13 words, the new set should be {11, 13, 14, 17 }. 

	Thus, the challenge of this feature is that the list of word counts needs to keep its ordered as it's being updated. We do not want to sort this list after reading every tweet. 

Solution:

	So, my solution is to insert the new number at the appropriate location by using a binary search. In full disclosure, I found these functions on stackoverflow while researching how to insert into a sorted list in Javascript. After reviewing the code I decided to use it instead of writing my own, which would be exactly the same algorithmically. 

	The overall algorithm is:
		1. Scan each tweet, we again use a dictionary to store unique words. This time instead of keep a tally we just store the value as true, since it's the number of keys we're after. 
		2. After a tweet is finished being read, we count the dictionary's number of keys to get the unique word count, and insert this into the wordCountArray, which is the sorted list.
		3. Then we find the median, and save it to the medianArray. After we are done with the entire file, we loop through the medianArray and write to ft2.txt

	NOTE: Using a dictionary to store unique values carry the same issue as explained in feature 1, but in this case also worthwhile to implement. 
