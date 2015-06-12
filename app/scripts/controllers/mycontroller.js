'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MycontrollerCtrl
 * @description
 * # MycontrollerCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('MycontrollerCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
