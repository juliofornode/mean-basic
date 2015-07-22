var mongoose = require('mongoose')
var url = process.env.MONGOLAB_URI || 'mongodb://localhost/dbone'

mongoose.connect(url)

module.exports = mongoose

