'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('LoginCtrl', ['$scope', '$location', 'loginService', '$cookieStore', 
      function($scope, $location, loginService, $cookieStore) {
        $scope.userName = '';
        $scope.password = '';
        $scope.userInfo = {};
        $scope.singIn = function() {
            var identifier = {
                "username": $scope.userName
            };
            loginService.loginLogLogin.save(identifier).$promise.then(function(result) {
                console.log(result);
                $cookieStore.put('userId',result.userId);
                $cookieStore.put('username',result.username);
                $location.path("/");
            });
        };
        $scope.save = function() {
            projectService.createProject.save({
                name: $scope.projectName,
                description: $scope.description
            }, function(result) {
                $window.location.href = '#/project/' + result.id;
            });
        };
    }]);