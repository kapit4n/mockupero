'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'loginService', '$cookieStore', 'projectService',
      function($rootScope, $scope, $location, loginService, $cookieStore, projectService) {
        $scope.userName = '';
        $scope.identifier = '';
        $scope.password = '';
        $scope.userInfo = {};
        $scope.singIn = function() {
            var identifier = {
                "email": $scope.identifier,
                "password": $scope.password
            };
            loginService.loginUser.save(identifier).$promise.then(function(result) {
                console.log(result);
                console.log("LoginCtrl");
                $rootScope.isAuthenticated = true;
                $rootScope.userNameLogin = result.user.email;

                $cookieStore.put('userId', result.user.id);
                $cookieStore.put('username', result.user.email);
                $rootScope.isAuthenticated  = true;
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