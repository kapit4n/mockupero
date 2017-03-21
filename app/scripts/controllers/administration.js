'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:AdministrationCtrl
 * @description
 * # AdministrationCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('AdministrationCtrl', ['$scope', 'workflowService', 'loginService', 'headerService',
        'breadcrumbService', '$location', '$rootScope',
        function($scope, workflowService, loginService, headerService, breadcrumbService, $location, $rootScope) {
            loginService.reloadScope();
            headerService.updateHeader('administration');
            $scope.workflows = [];
            $scope.editMode = true;
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('administration', 'admin');
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
