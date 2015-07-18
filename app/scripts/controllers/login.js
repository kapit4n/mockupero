'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
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
