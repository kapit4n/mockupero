'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('ProjectCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.addMockup = function () {
      $location.path('/mockup-new');
    };
    $scope.workflow = {start: "start", close: "close", abandon: "abandon"};

  }]);
