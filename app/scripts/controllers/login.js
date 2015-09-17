'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
  .controller('LoginCtrl', ['$scope', '$location', 'loginService', function ($scope,$location, loginService) {
    $scope.userName = 'demo';
    $scope.password = 'demodemodemo';
    $scope.userInfo = {};
    $scope.singIn = function() {
    	var identifier = {
        "identifier": $scope.userName,
        "password": $scope.password
      };
      loginService.loginUser.save(identifier).$promise.then(function(result) {
          $scope.userInfo = result;
          loginService.registerUser($scope.userName, result);
          $location.path("/");
      });
    };
  }]);
