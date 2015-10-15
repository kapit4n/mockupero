'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:RegisteruserCtrl
 * @description
 * # RegisteruserCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('RegisteruserCtrl', ['$scope', 'userService', 'projectService', '$routeParams', '$location', '$rootScope',
    function($scope, userService, projectService, $routeParams, $location, $rootScope) {
	    $scope.username = '';
	    $scope.email = '';
	    $scope.password = '';
	    $scope.password_confirm = '';

	    $scope.registerUserSave = function() {
            console.log($scope.username);
		    console.log($scope.email);
		    console.log($scope.password);
		    console.log($scope.password_confirm);
		    userService.createUser.save({
		    	username: $scope.username,
		    	email: $scope.email,
		    	password: $scope.password,
		    	firstName: $scope.username,
		    	lastName: $scope.username
		    }, function(result){
		    	console.log(result)
		    });
        };
	}
  ]);
