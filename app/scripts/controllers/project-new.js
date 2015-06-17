'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:ProjectNewCtrl
 * @description
 * # ProjectNewCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('ProjectNewCtrl', ['$scope', '$location', function ($scope,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.createProject = function () {
    	$location.path('/');
    };
  }]);
