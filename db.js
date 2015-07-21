var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dbone', function() {
	console.log('mongodb connected')
})

module.exports = mongoose

