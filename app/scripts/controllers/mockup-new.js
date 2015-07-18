'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupNewCtrl
 * @description
 * # MockupNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
  .controller('MockupNewCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.createMockup = function () {
    	$location.path('/project/0');
    };
  }]);
