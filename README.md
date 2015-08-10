
BASIC MEAN
===

1. Start With an Html & Bootstrap Mock Up
---
* Add Bootstrap CSS from CDN
* We can use available templates


2. Add Angular to Prototype the App
---
* Add Angular script from CDN
* Declare ng app
* Set ng controller and scope
```
$scope.posts
$scope.addPost
```

* Add ng directives
     > ng-app
		 > ng-controller
		 > ng-repeat
		 > ng-model
		 > ng-click


3. Set the Server With Node and Express
---
* npm init
* Install express and body-parser
* Create basic server
* Create basic get/post api
* Check post with curl


4. Run Mongo Deamon, Create db, use Mongoose to Connect and Create Model
---
* mongod
* mongo
* use databaseName
* install mongoose
* set db connection in db.js
* define model in models/modelName.js
* update get/post api with Mongo find/save


5. Move ng to Server and use $Http to Connect ng the Api
---
* Move posts.html to /layouts/posts.html
* $http.get('path').success(function(posts) {
* $http.post('path', postFields).success(function(post) {





