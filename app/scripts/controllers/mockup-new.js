'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MockupNewCtrl
 * @description
 * # MockupNewCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('MockupNewCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.createMockup = function () {
    	$location.path('/project/0');
    };
  }]);
