'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('MainCtrl', ['$scope', 'mockupService', '$location', '$rootScope', function ($scope, mockupService, $location, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.addProject = function () {
      $location.path('/project-new');
    };

    $rootScope.breadcrumb = mockupService.breadcrumb['home'];
  }]);
