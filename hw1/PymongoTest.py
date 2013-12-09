__author__ = 'somnathbanerjee'

import pymongo
import sys

def main():
	conn = pymongo.MongoClient()
	db = conn.m101
	people = db.people

	aPerson = {'name' : 'Somnath Banerjee',
	           'email' : 'sbanerjee2005@gmail.com',
	           'address' : {
						'street' : '636 W. Remington Dr.',
	                    'city' : 'Sunnyvale',
						'zip'  : 94087,
						'state' : 'CA',
						'country' : 'USA',
				},
				'interests' : ['iOS', 'python' , 'API', 'D3', 'Android', 'Angular']
				}

	print aPerson
	print "about to insert the aPerson"

	try:
		people.insert(aPerson)
		print "Person inserted successfully: " , aPerson
	except:
		print "Insertion failed: " , sys.exc_info()[0]


	print "inserting again"

	try:
	    people.insert(aPerson)
	except:
	    print "second insert failed:", sys.exc_info()[0]

	print aPerson


main()