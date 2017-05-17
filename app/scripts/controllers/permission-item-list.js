'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:PermissionItemListCtrl
 * @description
 * # PermissionItemListCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
  .controller('PermissionItemListCtrl', ['$scope', 'permissionItemService', 'loginService', 'headerService',
        'breadcrumbService', '$rootScope',
        function($scope, permissionItemService, loginService, headerService, breadcrumbService, $rootScope) {
            loginService.reloadScope();
            headerService.updateHeader('permissionItem');
            $scope.permissionItems = [];
            $scope.editMode = true;
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('permissionItem-list', 'permissionItem-list');
            $scope.err = "";

            $scope.reloadPermissionItems = function() {
                permissionItemService.permissionItem.get({})
                    .$promise.then(function(result) {
                        $scope.permissionItems = result;
                    }, function(error) {
                        $scope.err = error;
                    });
            }

            $scope.addPermissionItem = function() {
                $location.path('/permission-item-new');
            }

            $scope.deletePermissionItem = function(userId) {
                permissionItemService.deletePermissionItem.delete({
                    id: userId
                }).$promise.then(function(result) {
                    $scope.reloadPermissionGroups();
                }, function(error) {
                    $scope.err = error;
                });
            }

            $scope.reloadPermissionItems();
        }
    ]);
