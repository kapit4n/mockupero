'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:WorkflowCtrl
 * @description
 * # WorkflowCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('WorkflowCtrl', ['$scope', 'workflowService', 'loginService', 'headerService', 'breadcrumbService',
        function($scope, workflowService, loginService, headerService, breadcrumbService) {
            loginService.reloadScope();
            headerService.updateHeader('user');
            $scope.user = null;
            $scope.editMode = true;
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('user', 'user');
            $scope.err = "";
        }
    ]);
