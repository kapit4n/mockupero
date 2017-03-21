'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:PermissionGroupCtrl
 * @description
 * # PermissionGroupCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('PermissionGroupCtrl', ['$scope', '$routeParams', '$rootScope', '$cookieStore', 'permissionGroupService', 'permissionItemService',
        'loginService', 'headerService', 'breadcrumbService', 'permissionService',
        function($scope, $routeParams, $rootScope, $cookieStore, permissionGroupService, permissionItemService, loginService,
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
                    try {
                        permissionService.loadPermission($scope, result.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('permission-group', $scope.permissionGroup);
                    } catch (e) {
                        $scope.err = error;
                        console.error(e);
                    }
                });

            $scope.reloadPermissionItems = function() {
                permissionItemService.permissionItem.get({})
                    .$promise.then(function(result) {
                        $scope.permissionItems = result;
                    }, function(error) {
                        $scope.err = error;
                        console.error(e);
                    });
            };

            $scope.addPermissionItem = function(permissionItem) {
                if (!$scope.permissionGroup.items) {
                    $scope.permissionGroup.items = [];
                }
                $scope.permissionGroup.items.push(permissionItem);
                $scope.save();
            };

            $scope.removePermissionItem = function(permissionItem) {
                for (var i = 0; i < $scope.permissionGroup.items.length; i++) {
                    if ($scope.permissionGroup.items[i].id == permissionItem.id) {
                        $scope.permissionGroup.items.splice(i, 1);
                    }
                }
                $scope.save();
            };

            $scope.save = function() {
                permissionGroupService.updatePermissionGroup.save({
                    id: $scope.permissionGroup.id
                }, $scope.permissionGroup, function(result) {}, function(err) {
                    $scope.err = err;
                });
            }


            $scope.reloadPermissionItems();
        }
    ]);
