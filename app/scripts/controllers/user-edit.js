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
            $scope.password = '';
            $scope.password_confirm = '';
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
                if ($scope.password) {
                    $scope.err = undefined;
                    var erro_aux = '';
                    if ($scope.password != $scope.password_confirm) {
                        erro_aux = "Confirmation password doesn't match \n";
                    }
                    if ($scope.password.length < 4) {
                        erro_aux += "Password should be at least 4 characters";
                    }
                    if (erro_aux) {
                        $scope.err = erro_aux;
                    } else {
                        $scope.user.password = $scope.password;
                    }
                }
                if (!$scope.err) {
                    userService.updateUser.save({
                        id: $scope.user.id
                    }, $scope.user, function(result) {
                            userService.publishUpdate($scope, result);
                        $scope.err = undefined;
                        $window.location.href = '#/user/' + $scope.user.id;
                    }, function(err) {
                        console.error(err);
                        $scope.err = err;
                    });
                }
            }

            $scope.cancel = function() {
                $window.location.href = '#/user/' + $scope.user.id;
            }
        }
    ]);
