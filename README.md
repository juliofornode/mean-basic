# mean-basic


BASIC MEAN
==========

1. START WITH AN HTML & BOOTSTRAP MOCK UP
-----------------------------------------
* Add Bootstrap CSS from CDN
* We can use available templates


2. ADD ANGULAR TO PROTOTYPE THE APP
-----------------------------------
* Add Angular script from CDN
* Declare ng app
* Set ng controller and scope
     > $scope.posts
		 > $scope.addPost

* Add ng directives
     > ng-app
		 > ng-controller
		 > ng-repeat
		 > ng-model
		 > ng-click


3. SET THE SERVER WITH NODE AND EXPRESS
---------------------------------------
* npm init
* Install express and body-parser
* Create basic server
* Create basic get/post api
* Check post with curl


4. RUN MONGO DEAMON, CREATE DB, USE MONGOOSE TO CONNECT AND CREATE MODEL
------------------------------------------------------------------------
* mongod
* mongo
* use databaseName
* install mongoose
* set db connection in db.js
* define model in models/modelName.js
* update get/post api with Mongo find/save


5. MOVE NG TO SERVER AND USE $HTTP TO CONNECT NG THE API
--------------------------------------------------------
* Move posts.html to /layouts/posts.html
* $http.get('path').success(function(posts) {
* $http.post('path', postFields).success(function(post) {











