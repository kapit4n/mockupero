'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('LoginCtrl', ['$scope', '$location', function ($scope,$location) {
    $scope.userName = '';
    $scope.password = '';
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.singIn = function() {
    	console.log('This is login event');
    	if ($scope.userName === 'admin' && $scope.password === 'admin') {
    		console.log('matched');
    		$location.path('/');
    	} else {
    		console.log('no matched');
    	}
    };
    
  }]);
