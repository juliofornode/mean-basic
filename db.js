var mongoose = require('mongoose')
mongoose.connect('mongodb://ds047478.mongolab.com:47478/heroku_9bfj9t84', function() {
	console.log('mongodb connected')
})

module.exports = mongoose