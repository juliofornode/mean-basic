
Basic MEAN Stack Project: Simple Twitter
===

[Link to live project](http://salty-lake-3481.herokuapp.com/)

0. Goals
---
* Single-page app that displays tweets
* Basic usage of the four components of the MEAN stack
* Usage of Mongoose to integrate Mongo and Node
* Testing JavaScript without final semicolons (bad practice)


1. Start With an Html & Bootstrap Mock Up
---
* HTML skeleton
* Bootstrap CSS from CDN


2. Add Angular to Prototype the App
---
* Initially, we'll add Angular scripts in HTML page, then we will move them to the server
* Add Angular script from CDN
* Declare ng app  
* Set ng controller and scope
```
<script>
	var app = angular.module('app', [])
	app.controller('CtrlName', function($scope) {
		$scope.posts = [{username: 'ben', body: 'tana'}, {...}]
		if($scope.postBody) {
			$scope.addPost = function () {
				$scope.posts.unshift({
					username: 'guan',
					// see the change here:
					body: $scope.postBody
				})
	
				$scope.postBody = null
			}
		}
	})
</script>
```

* Add ng directives
```
ng-app
ng-controller
ng-repeat
ng-model
ng-click
```

3. Set the Server With Node and Express
---
* the page /api/posts will return a JSON array with all posts via GET
* the page /api/posts will send new tweets to Mongo via POST
* npm init
```
Very important: maintain versions in packckage.json in order to avoid  
possible issues with newer versions.
```


* Install express and body-parser
* Create basic server
```
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('Server running on localhost:3000');
});
```

* Create basic get/post api
```
app.get('/api/posts', function(req, res) {
  res.json([{
  	username: "Dick",
  	body: "My taylor is rich"
  }])

});

app.post('/api/posts', function(req, res) {
  console.log('post received!');
  console.log(req.body.username);
  console.log(req.body.body);
  res.send(201);
});

```

* Check post with curl (alternative: use the Postman app for Chrome)
```
curl -v -H "Content Type: application/json" -XPOST --data  
"{\"username\":\"guan\", \"body\": \"asin bonanga\"}"   
localhost:3000/api/posts

Alternative:

curl -H "Content Type: application/json" -X POST -d '{ "post":   
{"username":"guan", "body": "asin bonanga"} }' localhost:3000/api/posts
```


4. Run Mongo Deamon, Create db, use Mongoose to Connect and Create Model
---
* mongod
* install mongoose
* set db connection in db.js
```
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/social', function() {
	console.log('mongodb connected');
});

module.exports = mongoose;
```

* define model in models/modelName.js
```
var db = require('../db');

var Post = db.model('Post', {
	username: { type: String, required: true },
	body: { type: String, required: true },
	date: { type: Date, required: true, default: Date.now }
});

module.exports = Post;

```

* update get/post api with Mongo find/save
```
// require the Post model
var Post = require('./models/post');


app.post('/api/posts', function(req, res, next) {
  //when a request comes in, build a new instance of the model Post
	var post = new Post({
		username: req.body.username,
		body: req.body.body
	});
	
	//save the new Post model and return 201 & a JSON representation of it
	post.save(function(err, post) {
		if(err) { return next(err) }
		res.json(201, post);
	});
	
});


app.get('/api/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if (err) { return next(err) }
		res.json(posts)
	})
})


// If we wanted to find just one document in the db:
app.get('/user', function(req, res, next) {
  User.findOne({username: auth.username}, function(err, user) {
		if (err) { return next(err) }
		res.status(201).json(user)  	
  })
})


```


5. Move ng to Server and use $http to Connect ng to Node
---
* Move posts.html to /layouts/posts.html to avoid a CORS error
* Update server.js
```
app.get('/', function(req, res) {
	res.sendfile('./layouts/posts.html')
})
```

* Update Angular: add $http as dependency of the controller
```
	<script type="text/javascript">
		var app = angular.module('app', [])
		app.controller('PostsCtrl', function($scope, $http) {

			$http.get('/api/posts')
			.success(function(posts) {
				// $scope.posts = posts from mongo
				$scope.posts = posts
			})

			$scope.addPost = function() {
				if ($scope.bodyPost) {
					$http.post('/api/posts', {
						username: 'Lourdes',
						body: $scope.bodyPost
					})
					.success(function(post) {
						$scope.posts.unshift(post)
						$scope.bodyPost = null
					})
				}
			}

		})
	</script>
```

* Notice that the success function has "posts" as parameter
* Little bug: when refreshing, the sort order changes. See next fixes (we can use one or the other)
* Via angular: 
```
ng-repeat="post in posts | orderBy:'-date'"
```

* Via Node:
```  
app.get('/api/posts', function(req, res, next) {
	Post.find()
	.sort('-date')
	.exec(function(err, posts) {
		if (err) { return next(err) }
		res.json(posts)
	})
})
```

6. Cleaning Node
---

BREAK OUT THE API ENDPOINTS INTO A CONTROLLER

* Build up a Router object and use it like an app object
* var router = require('express').Router()
* Remove module.exports = function(app) {
* Replace app by router
* module.exports = router
* Finally, in server.js: app.use(require('./controllers/api/posts'))

* One last improvement: namespace the routers
```
 > in server.js: 
 app.use('/api/posts', require('./controllers/api/posts'))
 
 > in /controllers/api/posts.js: 
 router.get('/', ...
 router.post('/', ...
```


BREAK OUT THE SENDFILE ENDPOINT INTO A CONTROLLER

* Create /controllers/static.js
* var router = require('express').Router()
* Move there the sendFile endpoint from server.js. Important: use sendfile, not sendFile (path not working)

* Replace app by router
* module.exports = router
* Finally, in server.js: app.use(require('./controllers/static'))
```
 > equivalent to: 
 app.use('/', require('./controllers/static'))
```

7. Cleaning Angular
---

SEPARATE JS FROM HTML

* We do this in development, in production we will use a CDN in front of the application to cache the assets

* Create /assets/app.js
* Move there the js
* Require the file from /controllers/static.js
```
 > require express and router
 router.use(express.static(__dirname + '/../assets'))
```

* Check changes in /app.js : raw js
* Include script src to /app.js in /layout/posts.html


BREAKING ANGULAR INTO SERVICES

* Services are a way to separate your code in components
* In Angular, a controller is created everytime it is used. Services, on the other hand, are reused.

* Define the service in /assets/app.js

```
app.service('PostsSvc', function($http) {
  this.fetch = function() {
	  return  $http.get('/api/posts')
	}
	
  this.create = function (post) {
	  return  $http.post('/api/posts', post)
	}
	
})
```

* Include the service as dependency of the controller:
```
app.controller('PostsCtrl', function($scope, PostsSvc) {
	
  PostsSvc.fetch()
  .success(function(posts) {
    $scope.posts = posts
  })

  $scope.addPost = function() {
  	if ($scope.postBody) {
    	PostsSvc.create({
        username: 'Belen',
        body: $scope.postBody
    	}).success(function(post) {
        $scope.posts.unshift(post)
    	  // clear out the input field
    	  $scope.postBody = null
      })	      	
    }
  }
})

```





