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
        'breadcrumbService', '$rootScope', '$location',
        function($scope, permissionItemService, loginService, headerService, breadcrumbService,
            $rootScope, $location) {
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

            $scope.deletePermissionItem = function(pItemId) {
                permissionItemService.deletePermissionItem.delete({
                    id: pItemId
                }).$promise.then(function(result) {
                    $scope.reloadPermissionItems();
                }, function(error) {
                    $scope.err = error;
                });
            }

            $scope.reloadPermissionItems();
        }
    ]);
