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
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('permissionGroup-list', 'permissionGroup-list');
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

            $scope.deletePermissionGroup = function(userId) {
                permissionGroupService.deletePermissionGroup.delete({
                    id: userId
                }).$promise.then(function(result) {
                    $scope.reloadPermissionGroups();
                }, function(error) {
                    $scope.err = error;
                });
            }

            $scope.reloadPermissionGroups();
        }
    ]);
