'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
