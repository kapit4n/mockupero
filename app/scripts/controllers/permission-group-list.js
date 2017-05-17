'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:PermissionGroupListCtrl
 * @description
 * # PermissionGroupListCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
  .controller('PermissionGroupListCtrl', ['$scope', 'permissionGroupService', 'loginService', 'headerService',
        'breadcrumbService', '$location', '$rootScope',
        function($scope, permissionGroupService, loginService, headerService, breadcrumbService, $location, $rootScope) {
            loginService.reloadScope();
            headerService.updateHeader('permissionGroup');
            $scope.permissionGroups = [];
            $scope.editMode = true;
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('permission-group-list', 'permission-group-list');
            $scope.err = "";

            $scope.reloadPermissionGroups = function() {
                permissionGroupService.permissionGroup.get({})
                    .$promise.then(function(result) {
                        $scope.permissionGroups = result;
                    }, function(error) {
                        $scope.err = error;
                    });
            }

            $scope.addPermissionGroup = function() {
                $location.path('/permission-group-new');
            }

            $scope.deletePermissionGroup = function(permissionGroupId) {
                permissionGroupService.deletePermissionGroup.delete({
                    id: permissionGroupId
                }).$promise.then(function(result) {
                    $scope.reloadPermissionGroups();
                }, function(error) {
                    $scope.err = error;
                });
            }

            $scope.reloadPermissionGroups();
        }
    ]);
