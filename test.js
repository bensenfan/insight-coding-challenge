var fs = require('fs');

var string = '\nis #bigdata finally the answer to end poverty? @lavanyarathnam http://ow.ly/o8gt3 #analytics\n' + 
						 'interview: xia wang, astrazeneca on #bigdata and the promise of effective healthcare #kdn http://ow.ly/ot2uj\n' +
						 'big data is not just for big business. on how #bigdata is being deployed for small businesses: http://bddy.me/1bzukb3 @cxotodayalerts #smb'

for (i=0; i<=100; i++){
	fs.appendFile('tweet_input/tweets.txt', string);
}
