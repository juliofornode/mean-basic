var mongoose = require('mongoose')
var url = process.env.mongodb://heroku_9bfj9t84:8r7jh6i81t7am1subec7cbhm5t@ds047478.mongolab.com:47478/heroku_9bfj9t84 || 'mongodb://localhost/dbone'

mongoose.connect(url)

module.exports = mongoose

