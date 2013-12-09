import bottle

@bottle.route('/')
def home_page():
	myfruits = ['apple', 'banana', 'orange', 'grape', 'mango' , 'cocounut']
	return bottle.template('hello_world', {'username': 'Somnath',
	                                       'fruits': myfruits})

@bottle.post('/favorite_fruit')
def favorite_fruit():
	fruit = bottle.request.forms.get("fruit")
	if (fruit == None or fruit == ""):
		fruit= "No Fruit Selected"
	bottle.response.set_cookie("fruit", fruit)
	bottle.redirect("/show_fruit")

@bottle.route('/show_fruit')
def show_fruit():
	fruit = bottle.request.get_cookie("fruit")
	return bottle.template('fruit_selection', {'fruit': fruit})

bottle.debug(True)
bottle.run(host='localhost', port = 8083)

