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
        $scope.objType = "Project";
        $scope.objName = "";
        $scope.description = '';
        $scope.imgToShow = '';

        try {
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project-new', 'Home');
        } catch(e) {}

        $scope.save = function(addObjectForm) {
          if (addObjectForm.$valid){
            projectService.createProject.save({
                name: $scope.objName,
                description: $scope.description,
                imgToShow: $scope.imgToShow,
                userId: $cookieStore.get('userId')
            }, function(result) {
                $window.location.href = '#/project/' + result.id;
            }, function(err){
                $scope.err = err;
            });
          }
        };

        $scope.cancel = function() {
            $window.location.href = '#/';
        }
    }]);
