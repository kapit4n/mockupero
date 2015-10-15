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
    $scope.userName = '';
    $scope.password = '';
    $scope.userInfo = {};
    $scope.singIn = function() {
    	var identifier = {
        "identifier": $scope.userName
      };

      loginService.loginLogLogin.save({username: $scope.userName}).$promise.then(function(result) {
        console.log('this method is called');
        console.log(result);
          loginService.loginLog.save(identifier).$promise.then(function(result) {
              $scope.userInfo = result;
              loginService.registerUser($scope.userName, result);
              $location.path("/");
          });
      })

 $scope.save = function() {
            projectService.createProject.save({
                name: $scope.projectName,
                description: $scope.description
            }, function(result) {
                $window.location.href = '#/project/' + result.id;
            });
        };
      
    };
  }]);
