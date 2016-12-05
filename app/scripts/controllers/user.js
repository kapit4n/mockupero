'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('UserCtrl', ['$rootScope', '$scope', 'loginService', '$window', '$routeParams', 'userService', 'breadcrumbService', 'headerService',
        function($rootScope, $scope, loginService, $window, $routeParams, userService, breadcrumbService, headerService) {
            loginService.reloadScope();
            headerService.updateHeader('users');
            $scope.user = null;
            $scope.editMode = true;
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('user', 'user');

            userService.userById.get({
                    userId: $routeParams.userId
                })
                .$promise.then(function(result) {
                    $scope.user = result;
                    try {
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('user', $scope.user);
                        $rootScope.$digest();
                    } catch (e) {}
                });
        }
    ]);
