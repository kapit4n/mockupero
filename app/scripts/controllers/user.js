'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('UserCtrl', function($scope) {
    	$scope.userName = "User Name";
    	$scope.update = function() {
    		console.log("This is the update example");
    	};
    });
