__author__ = 'somnathbanerjee'
# This will contain the entire transcript of Week2 Materials

# We will go over Document CRUD

import pymongo
import sys
import urllib2
import json

connection = pymongo.Connection("mongodb://localhost", safe=True)

db = connection.reddit
stories =db.stories


reddit_page = urllib2.urlopen("http://www.reddit.com/r/technology/.json")

# parse the json into python objects
#parsed = json.loads(reddit_page.read())

# iterate through every news item on the page
#for item in parsed['data']['children']:
	#stories.insert(item['data'])


def find():

    print "find, reporting for duty"

    query = {'title':{'$regex':'Facebook'}}
    projection = {'title':1, '_id':0}

    try:
        iter = stories.find(query, projection)

    except:
        print "Unexpected error:", sys.exc_info()[0]

    sanity = 0
    for doc in iter:
        print doc
        sanity += 1
        if (sanity > 10):
            break


#find()

def findVideo():

    print "find, Videos"

    query = {'media.oembed.type':'video'}
    projection = {'media.oembed.url':1, '_id':0}

    try:
        iter = stories.find(query, projection)

    except:
        print "Unexpected error:", sys.exc_info()[0]

    sanity = 0
    for doc in iter:
        print doc
        sanity += 1
        if (sanity > 10):
            break


findVideo()

