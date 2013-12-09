__author__ = 'somnathbanerjee'
fruits=['apple', 'banana', 'kiwi', 'orange', 'kiwi','grape', 'banana', 'kiwi', 'apple', 'grape', 'grape']   #Edit the Array
#print fruits

# reports the frequency of every item in the list

def analyze_list(l):

	counts = {}
	for item in l:
		if item in counts:
			counts[item] = counts[item] + 1
		else:
			counts[item] = 1
	return counts

# let's analyze a list
counts = analyze_list(fruits)
print counts
