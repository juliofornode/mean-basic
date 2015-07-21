var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.send('Hola mamon!')
})

app.get('/api/posts', function(req, res) {
  var user = {
		username: 'Julio',
		body: 'mastering the basic mean'
  } 
  res.json(user)
})

app.post('/api/posts', function(req, res) {
  var user = {
  	username: req.body.username,
  	body: req.body.body
  } 
  res.json(user)
})


app.listen(3000, function() {
	console.log('Server connected on', 3000)
})