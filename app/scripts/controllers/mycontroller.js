'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MycontrollerCtrl
 * @description
 * # MycontrollerCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
  .controller('MycontrollerCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
