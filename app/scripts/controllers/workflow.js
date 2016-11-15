'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:WorkflowCtrl
 * @description
 * # WorkflowCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('WorkflowCtrl', ['$scope', '$routeParams', '$rootScope', '$cookieStore', 'workflowService',
        'loginService', 'headerService', 'breadcrumbService', 'permissionService',
        function($scope, $routeParams, $rootScope, $cookieStore, workflowService, loginService,
            headerService, breadcrumbService, permissionService) {
            loginService.reloadScope();
            headerService.updateHeader('workflow');
            $scope.user = null;
            $scope.editMode = true;
            $scope.err = "";

            $scope.workflow = null;
            workflowService.workflowById.get({
                    workflowId: $routeParams.workflowId
                })
                .$promise.then(function(result) {
                    $scope.workflow = result;
                    try {
                        permissionService.loadPermission($scope, result.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('workflow', $scope.workflow);
                    } catch (e) { console.log(e); }
                });
        }
    ]);
