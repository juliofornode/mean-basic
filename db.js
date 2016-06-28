var mongoose = require('mongoose')
var url = 'mongodb://bob:test@ds023684.mlab.com:23684/tweety'
//var url = 'mongodb://localhost/dbone'

mongoose.connect(url, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('db connected');
    }
});

module.exports = mongoose

