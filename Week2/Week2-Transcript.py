__author__ = 'somnathbanerjee'
# This will contain the entire transcript of Week2 Materials

# We will go over Document CRUD

import pymongo
import sys

connection = pymongo.Connection("mongodb://localhost", safe=True)

db = connection.students
grades = db.grades

def find():
	print "Finding 10"
	query = {'type' : 'exam',  'score' : { '$gt' : 50, '$lt' : 60} }
	selector = {'student' : 1,  'score' : 1,  '_id'  : 0}

	try:
		cur = grades.find(query, selector)
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
	query = {'student_id' : 11}

	try:
		doc = grades.find_one(query)
	except:
		print "Unexpected error:",  sys.exc_info()[0]

	print doc


find()
#find_one()

