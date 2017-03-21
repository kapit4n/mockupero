'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:WorkflowEditCtrl
 * @description
 * # WorkflowEditCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('WorkflowEditCtrl', ['$scope', '$routeParams', '$rootScope', '$window', '$cookieStore',
        'workflowService',
        'loginService', 'headerService', 'breadcrumbService', 'permissionService',
        function($scope, $routeParams, $rootScope, $window, $cookieStore, workflowService, loginService,
            headerService, breadcrumbService, permissionService) {
            loginService.reloadScope();
            headerService.updateHeader('administration');
            $scope.user = null;
            $scope.editMode = true;
            //$rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('workflow', 'workflow');
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

            $scope.save = function(workflowForm) {
                if (workflowForm.$valid) {
                    workflowService.updateWorkflow.save({
                        id: $scope.workflow.id
                    }, $scope.workflow, function(result) {
                        $window.location.href = '#/workflow/' + $scope.workflow.id;
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            }

            $scope.cancel = function() {
                $window.location.href = '#/workflow/' + $scope.workflow.id;
            }
        }
    ]);
