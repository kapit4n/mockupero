'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:PermissionItemNewCtrl
 * @description
 * # PermissionItemNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('PermissionItemNewCtrl', ['$scope', '$window', '$location', '$cookieStore',
        'permissionItemService', 'breadcrumbService', 'headerService',
        function($scope, $window, $location, $cookieStore, permissionItemService,
            breadcrumbService, headerService) {

            headerService.updateHeader('permission-item');
            $scope.pItemName = "";
            $scope.pItemModel = "";
            $scope.pItemDescription = "btn-default";

            try {
                $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('permission-item-new', 'Home');
            } catch (e) {}

            $scope.save = function(pItemForm) {
                if (pItemForm.$valid) {
                    permissionItemService.createPermissionItem.save({
                        name: $scope.pItemName,
                        model: $scope.pItemModel,
                        description: $scope.pItemDescription
                    }, function(result) {
                        $location.path("/permission-item/" + result.id);
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            };

            $scope.cancel = function() {
                $location.path('/permission-item-list');
            }
        }
    ]);
