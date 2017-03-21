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
            headerService.updateHeader('administration');
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

            $scope.reloadWorkflows = function() {
                workflowService.workflow.get({})
                    .$promise.then(function(result) {
                        $scope.workflows = result;
                    }, function(error) {
                        $scope.err = error;
                    });
            };

            $scope.addPreviousWorkflow = function(workflow) {
                $scope.workflow.previous.push(workflow);
                $scope.save();
            };

            $scope.removePreviousWorkflow = function(workflow) {
                for (var i = 0; i < $scope.workflow.previous.length; i++) {
                    if ($scope.workflow.previous[i].id == workflow.id) {
                        $scope.workflow.previous.splice(i, 1);
                    }
                }
                $scope.save();
            };

            $scope.addNextWorkflow = function(workflow) {
                $scope.workflow.next.push(workflow);
                $scope.save();
            };

            $scope.removeNextWorkflow = function(workflow) {
                for (var i = 0; i < $scope.workflow.next.length; i++) {
                    if ($scope.workflow.next[i].id == workflow.id) {
                        $scope.workflow.next.splice(i, 1);
                    }
                }
                $scope.save();
            };

            $scope.save = function() {
                workflowService.updateWorkflow.save({
                    id: $scope.workflow.id
                }, $scope.workflow, function(result) {}, function(err) {
                    $scope.err = err;
                });
            }


            $scope.reloadWorkflows();
        }
    ]);
