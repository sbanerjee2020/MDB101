__author__ = 'somnathbanerjee'
# This will contain the entire transcript of Week2 Materials

# We will go over Document CRUD

import pymongo
import sys
import urllib2
import json



connection = pymongo.Connection("mongodb://localhost", safe=True)

#db = connection.somnathdb
#scores = db.scores

db = connection.reddit
stories =db.stories


reddit_page = urllib2.urlopen("http://www.reddit.com/r/technology/.json")

# parse the json into python objects
parsed = json.loads(reddit_page.read())

# iterate through every news item on the page
for item in parsed['data']['children']:
    # put it in mongo
    stories.insert(item['data'])




def find():
	print "Finding 10"
	query = {'type' : 'exam',  'score' : { '$gt' : 50, '$lt' : 60} }
	selector = {'student' : 1,  'score' : 1,  '_id'  : 0}

	try:
		cur = scores.find(query, selector)
	except:
		print "Unexpected error:",  sys.exc_info()[0]

	count = 0
	for doc in cur:
		print doc
		count = count + 1
		if (count == 10) :
			break




def find_one():
	print "Call of Duty"
	query = {'student' : 11}

	try:
		doc = scores.find_one(query)
	except:
		print "Unexpected error:",  sys.exc_info()[0]

	print doc

#find()
