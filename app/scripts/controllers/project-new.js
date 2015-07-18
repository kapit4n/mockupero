'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:ProjectNewCtrl
 * @description
 * # ProjectNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('ProjectNewCtrl', ['$scope', '$window', 'projectService', function($scope, $window, projectService) {

        $scope.projectName = 'Project Name Scope';
        $scope.description = 'Project Description Scope';
        $scope.createProject = function() {
            projectService.createProject.save({
                name: $scope.projectName,
                description: $scope.description
            }, function(result) {
                $window.location.href = '#/project/edit/' + result.id;
            });
        };
    }]);
