'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:WorkflowNewCtrl
 * @description
 * # WorkflowNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('WorkflowNewCtrl', ['$scope', '$window', '$cookieStore',
        'workflowService', 'breadcrumbService', 'headerService',
        function($scope, $window, $cookieStore, workflowService,
            breadcrumbService, headerService) {

            headerService.updateHeader('administration');
            $scope.wName = "";
            $scope.wAction = "";
            $scope.wClassName = "btn-default";

            try {
                $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project-new', 'Home');
            } catch (e) {}
            $scope.save = function(workflowForm) {
                if (workflowForm.$valid) {
                    workflowService.createWorkflow.save({
                        name: $scope.wName,
                        action: $scope.wAction,
                        wClassName: $scope.wClassName,
                    }, function(result) {
                        $window.location.href = '#/workflow/' + result.id;
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            };

            $scope.cancel = function() {
                $window.location.href = '#/workflowlist';
            }
        }
    ]);
