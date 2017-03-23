'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:RegisteruserCtrl
 * @description
 * # RegisteruserCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('RegisteruserCtrl', ['$scope', 'userService', 'projectService', '$routeParams', '$location', '$rootScope', 'headerService', 'breadcrumbService',
        function($scope, userService, projectService, $routeParams, $location, $rootScope, headerService, breadcrumbService) {
            headerService.updateHeader('users');
            $scope.username = '';
            $scope.email = '';
            $scope.password = '';
            $scope.password_confirm = '';
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('user-list', 'user');
            $scope.registerUserSave = function(registerForm) {
                if (registerForm.$valid) {
                    userService.createUser.save({
                        username: $scope.username,
                        email: $scope.email,
                        password: $scope.password,
                        firstName: $scope.username,
                        lastName: $scope.username
                    }, function(result) {
                        userService.publishCreate($scope, result);
                        $location.path('/userlist');
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            };
        }
    ]);
