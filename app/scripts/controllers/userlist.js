'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('UserlistCtrl', ['$rootScope', '$scope', 'loginService', 'mockupService', 'projectService', 'userService', '$location', 'headerService', 'breadcrumbService',
        function($rootScope, $scope, loginService, mockupService, projectService, userService, $location, headerService, breadcrumbService) {

            loginService.reloadScope();
            headerService.updateHeader('users');
            $scope.users = [];
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('user-list', 'user');

            $scope.reloadUsers = function() {
                userService.user.get({})
                    .$promise.then(function(result) {
                        $scope.users = result;
                    }, function(error) {
                        $scope.err = error;
                    });
            }

            $scope.addUser = function() {
                $location.path('/registerUser');
            }

            $scope.deleteUser = function(userId) {
                userService.deleteUser.delete({
                    id: userId
                }).$promise.then(function(result) {
                    $scope.reloadUsers();
                }, function(error) {
                    $scope.err = error;
                });
            }

            $scope.reloadUsers();
        }
    ]);
