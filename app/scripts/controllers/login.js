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
    console.log('controle called 2');
    $scope.userName = '';
    $scope.password = '';
    $scope.userInfo = {};
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.singIn = function() {
    	var identifier = {"identifier": "demo", "password": "demodemodemo"};
      loginService.loginUser.save(identifier).$promise.then(function(result) {
          console.log(result);
          $scope.userInfo = result;
      });
    };
    
  }]);
