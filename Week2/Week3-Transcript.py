__author__ = 'somnathbanerjee'
# This will contain the entire transcript of Week2 Materials

# We will go over Document CRUD

import pymongo
import sys




connection = pymongo.Connection("mongodb://localhost", safe=True)

db = connection.school
students =db.students




def find():
	print "Finding 10"
	query = {'scores.type' : 'exam'}  #  'score' : { '$gt' : 10, '$lt' : 100} }
	selector = {'scores.score' : 1,  'scores.type' : 1,  '_id'  : 0}

	try:
		cur = students.find(query, selector)
	except:
		print "Unexpected error:",  sys.exc_info()[0]

	count = 0
	for doc in cur:
		print doc
		count = count + 1
		if (count == 10) :
			break

def stripLowerHomerworkScore():
	print "Stripping Lower Homework Score"
	query = {}

	try:
		scores = 	students.find(query)
		homework_scores = [ (i, scores[i]['score']) for i in range(len(scores)) if scores[i]['type'] == 'homework']
		min_homework_score_idx = min(homework_scores, key=(lambda x: x[1]))[0]
		scores.pop(min_homework_score_idx)
		print scores

	except:
		print "Unexpected error:",  sys.exc_info()[0]


def removeLowerHomerworkScore():
	print "Removing Lower Homework Score"
	query = {}

	try:

		for doc in students.find(query):
			scoresOfOneStudent = doc['scores']
			homeworkscores = []
			for aScore in scoresOfOneStudent:
				if aScore['type'] == 'homework' :
					homeworkscores.append(aScore)


			minScore = homeworkscores[0]
			if homeworkscores[0]['score'] > homeworkscores[1]['score'] :
					minScore = homeworkscores[1]


		#	val, idx = min((val, idx) for (idx, val) in scoresOfOneStudent

			scoresOfOneStudent.remove(minScore)

			students.update({'_id':doc['_id']},{'scores': scoresOfOneStudent },upsert=False, multi=False)


	except:
		print "Unexpected error:",  sys.exc_info()[0]




def find_one():
	print "Call of Duty"
	query = {'_id' : 100}

	try:
		doc = students.find_one(query)
	except:
		print "Unexpected error:",  sys.exc_info()[0]

	print doc

stripLowerHomerworkScore()
#removeLowerHomerworkScore()
#find_one()

