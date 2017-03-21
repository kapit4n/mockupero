'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:PermissionGroupNewCtrl
 * @description
 * # PermissionGroupNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
  .controller('PermissionGroupNewCtrl', ['$scope', '$window', '$cookieStore',
        'permissionGroupService', 'breadcrumbService', 'headerService',
        function($scope, $window, $cookieStore, permissionGroupService,
            breadcrumbService, headerService) {

            headerService.updateHeader('permission-group');
            $scope.pGroupName = "";
            $scope.pGroupDescription = "";
            $scope.wClassName = "btn-default";

            try {
                $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project-new', 'Home');
            } catch (e) {}

            $scope.save = function(workflowForm) {
                if (workflowForm.$valid) {
                    permissionGroupService.createWorkflow.save({
                        name: $scope.pGroupName,
                        description: $scope.pGroupDescription
                    }, function(result) {
                        $window.location.href = '#/permission-group/' + result.id;
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            };

            $scope.cancel = function() {
                $window.location.href = '#/permission-group-list';
            }
        }
    ]);
