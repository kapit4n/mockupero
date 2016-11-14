'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:WorkflowlistCtrl
 * @description
 * # WorkflowlistCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('WorkflowlistCtrl', ['$scope', 'workflowService', 'loginService', 'headerService',
        'breadcrumbService', '$location', '$rootScope',
        function($scope, workflowService, loginService, headerService, breadcrumbService, $location, $rootScope) {
            loginService.reloadScope();
            headerService.updateHeader('user');
            $scope.workflows = [];
            $scope.editMode = true;
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('user', 'user');
            $scope.err = "";

            $scope.reloadWorkflows = function() {
                workflowService.workflow.get({})
                    .$promise.then(function(result) {
                        $scope.workflows = result;
                    }, function(error) {
                        $scope.err = error;
                    });
            }

            $scope.addWorkflow = function() {
                $location.path('/workflow-new');
            }

            $scope.deleteWorkflow = function(userId) {
                workflowService.deleteWorkflow.delete({
                    id: userId
                }).$promise.then(function(result) {
                    $scope.reloadWorkflows();
                }, function(error) {
                    $scope.err = error;
                });
            }

            $scope.reloadWorkflows();
        }
    ]);
