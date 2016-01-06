var app = angular.module('upvoter', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostCtrl'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })

  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', [
'$scope',
'posts',

function($scope, posts){
	$scope.posts = posts.posts;

  $scope.addPost = function() {
  	if(!$scope.title || $scope.title === '') { return; }
		$scope.posts.push({
			title: $scope.title, 
			upvotes: 0,
			link: $scope.link,
			comments: [
				{author: 'Nick', body: 'Cool post!', upvotes: 0},
    		{author: 'Ed', body: 'Great idea but everything is wrong!', upvotes: 0}
			]
		});
		$scope.title = '';	
		$scope.link = '';
  };

  $scope.incrementUpvotes = function (post) {
  	post.upvotes += 1;
  }
}]);

app.controller('PostCtrl', [
	'$scope',
	'$stateParams',
	'posts',

	function($scope, $stateParams, posts) {
		$scope.post = posts.posts[$stateParams.id];
}]);

app.factory('posts', [function() {
	var o = {
		posts: []
	};
	return o;
}]);

