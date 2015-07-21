var express = require('express')
var bodyParser = require('body-parser')
var Post = require('./models/post')

var app = express()
app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.sendfile('./layouts/posts.html')
})

app.get('/api/posts', function(req, res, next) {
  Post.find()
  .sort('-date')
  .exec(function(err, posts) {
    if (err) { return next(err) }
    res.json(posts)
  })
})

app.post('/api/posts', function(req, res, next) {
  var post = new Post({
  	username: req.body.username,
  	body: req.body.body
  })
  post.save(function(err, post) {
    if (err) { return next(err) }
    res.json(post)   
  })
})


app.listen(3000, function() {
	console.log('Server connected on', 3000)
})