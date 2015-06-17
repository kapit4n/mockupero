'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('ProjectCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
