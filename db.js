var mongoose = require('mongoose')
var url = 'mongodb://julio:test@ds023684.mlab.com:23684/tweety';
//var url = 'mongodb://localhost/dbone'

mongoose.connect(url)

module.exports = mongoose

