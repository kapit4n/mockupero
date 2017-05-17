'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:PermissionItemCtrl
 * @description
 * # PermissionItemCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('PermissionItemCtrl', ['$scope', '$routeParams', '$rootScope', '$cookieStore', 'permissionItemService',
        'loginService', 'headerService', 'breadcrumbService', 'permissionService',
        function($scope, $routeParams, $rootScope, $cookieStore, permissionItemService, loginService,
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
                    try {
                        permissionService.loadPermission($scope, result.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('permission-item', $scope.permissionItem);
                    } catch (e) {
                        $scope.err = error;
                        console.error(e);
                    }
                });
        }
    ]);
