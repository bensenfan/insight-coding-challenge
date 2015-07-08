#!/usr/bin/env bash

# example of the run script for running the word count

# I'll execute my programs, with the input directory tweet_input and output the files in the directory tweet_output
 node ./src/words_tweeted.js ../tweet_input/tweets.txt ../tweet_output/ft1.txt
 node ./src/median_unique.js ../tweet_input/tweets.txt ../tweet_output/ft2.txt
