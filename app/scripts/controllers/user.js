'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('UserCtrl', ['$rootScope', '$scope', 'loginService', '$window', '$routeParams', 'userService', 'breadcrumbService', 'headerService', 'GlobalService',
        function($rootScope, $scope, loginService, $window, $routeParams, userService, breadcrumbService, headerService, GlobalService) {
            loginService.reloadScope();
            headerService.updateHeader('users');
            $scope.globalService = GlobalService;
            $scope.user = null;
            $scope.userId = $routeParams.userId;
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
            
            $scope.getUserUrl = function() {
                return $scope.globalService.BASE_PATH + "/images/avatar/" + $scope.user.id + ".jpg";
            };
            
            $scope.getAvatarActionUrl = function() {
                return $scope.globalService.BASE_PATH + "/user/uploadAvatar";
            }
        }
    ]);
