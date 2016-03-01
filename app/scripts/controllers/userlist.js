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
            userService.user.get({})
                .$promise.then(function(result) {
                    $scope.users = result;
                });

            $scope.addUser = function() {
                $location.path('/registerUser');
            }
        }
    ]);