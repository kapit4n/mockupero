'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:ProjectEditCtrl
 * @description
 * # ProjectEditCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('ProjectEditCtrl', ['$scope', '$window', '$routeParams', 'projectService', function($scope, $window, $routeParams, projectService) {
        $scope.project = null;

        projectService.projectById.get({
                projectId: $routeParams.projectId
            })
            .$promise.then(function(result) {
                console.log(result);
                $scope.project = result;
            });
        $scope.saveProject = function() {
            projectService.updateProject.update({
                id: $scope.project.id
            }, $scope.project, function(result) {
                console.log(result);
                $window.location.href = '#/project/' + $scope.project.id;
            });
        }

        $scope.cancel = function() {
            $window.location.href = '#/project/' + $scope.project.id;
        }
    }]);
