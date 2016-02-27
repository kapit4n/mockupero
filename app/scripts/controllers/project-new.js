'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:ProjectNewCtrl
 * @description
 * # ProjectNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('ProjectNewCtrl', ['$scope', '$window', '$cookieStore', 'projectService', 'breadcrumbService', 'headerService',
        function($scope, $window, $cookieStore, projectService, breadcrumbService, headerService) {
        headerService.updateHeader('projects');
        $scope.projectName = '';
        $scope.objName = "Project";
        $scope.description = '';
        $scope.imgToShow = '';

        try {
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project-new', 'Home');
        } catch(e) {}

        $scope.save = function() {
            projectService.createProject.save({
                name: $scope.projectName,
                description: $scope.description,
                imgToShow: $scope.imgToShow,
                userId: $cookieStore.get('userId')
            }, function(result) {
                $window.location.href = '#/project/' + result.id;
            });
        };

        $scope.cancel = function() {
            $window.location.href = '#/';
        }
    }]);
