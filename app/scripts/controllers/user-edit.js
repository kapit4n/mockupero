'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('UserEditCtrl', ['$rootScope', '$scope', 'loginService', '$window', '$routeParams', 'userService', 'breadcrumbService', 'headerService',
        function($rootScope, $scope, loginService, $window, $routeParams, userService, breadcrumbService, headerService) {
            loginService.reloadScope();
            headerService.updateHeader('users');
            $scope.user = null;

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

            $scope.saveUser = function() {
                userService.updateUser.save({
                    id: $scope.user.id
                }, $scope.user, function(result) {
                    $window.location.href = '#/user/' + $scope.user.id;
                });
            }

            $scope.cancel = function() {
                $window.location.href = '#/user/' + $scope.user.id;
            }
        }
    ]);
