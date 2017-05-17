'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:PermissionItemEditCtrl
 * @description
 * # PermissionItemEditCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('PermissionItemEditCtrl', ['$scope', '$routeParams', '$rootScope', '$location', '$cookieStore',
        'permissionItemService',
        'loginService', 'headerService', 'breadcrumbService', 'permissionService',
        function($scope, $routeParams, $rootScope, $location, $cookieStore, permissionItemService, loginService,
            headerService, breadcrumbService, permissionService) {
            loginService.reloadScope();
            headerService.updateHeader('permissionItem');
            $scope.user = null;
            $scope.editMode = true;
            $scope.err = "";

            $scope.permissionItem = null;
            permissionItemService.permissionItemById.get({
                    permissionItemId: $routeParams.permissionItemId
                })
                .$promise.then(function(result) {
                    $scope.permissionItem = result;
                    console.log(result);
                    $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('permission-item', $scope.permissionItem);
                }, function(err) {
                    console.error(err);
                });

            $scope.save = function(permissionItemForm) {
                if (permissionItemForm.$valid) {
                    permissionItemService.updatePermissionItem.save({
                        id: $scope.permissionItem.id
                    }, $scope.permissionItem, function(result) {
                        $location.path("/permission-item/" + result.id);
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            }

            $scope.cancel = function() {
                $location.path("/permission-item/" + $scope.permissionItem.id);
            }
        }
    ]);
