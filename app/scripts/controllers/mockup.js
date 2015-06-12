'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MockupCtrl
 * @description
 * # MockupCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('MockupCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
