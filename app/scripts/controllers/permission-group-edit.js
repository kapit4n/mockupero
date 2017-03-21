'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:PermissionGroupEditCtrl
 * @description
 * # PermissionGroupEditCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('PermissionGroupEditCtrl', ['$scope', '$routeParams', '$rootScope', '$location', '$cookieStore',
        'permissionGroupService',
        'loginService', 'headerService', 'breadcrumbService', 'permissionService',
        function($scope, $routeParams, $rootScope, $location, $cookieStore, permissionGroupService, loginService,
            headerService, breadcrumbService, permissionService) {
            loginService.reloadScope();
            headerService.updateHeader('permissionGroup');
            $scope.user = null;
            $scope.editMode = true;
            $scope.err = "";

            $scope.permissionGroup = null;
            permissionGroupService.permissionGroupById.get({
                    permissionGroupId: $routeParams.permissionGroupId
                })
                .$promise.then(function(result) {
                    $scope.permissionGroup = result;
                    $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('permission-group', $scope.permissionGroup);
                }, function(err) {
                    console.error(err);
                });

            $scope.save = function(permissionGroupForm) {
                if (permissionGroupForm.$valid) {
                    permissionGroupService.updatePermissionGroup.save({
                        id: $scope.permissionGroup.id
                    }, $scope.permissionGroup, function(result) {
                        $location.path("/permission-group/" + result.id);
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            }

            $scope.cancel = function() {
                $location.path("/permission-group/" + $scope.permissionGroup.id);
            }
        }
    ]);
