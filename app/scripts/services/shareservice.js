'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.shareService
 * @description
 * # shareService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('shareService', function($resource, GlobalService, projectService) {
        var fac = {};
        fac.loadShareEntries = function($scope, projectId) {
            projectService.getProjectUsers.get({
                where: {
                    project: $scope.sharedProjectId
                }
            }).$promise.then(function(result) {
                $scope.projectShareEntries = [];
                result.forEach(function(projectShare) {
                    $scope.projectShareEntries.push(projectShare);
                });
            });
        };

        return fac;

    });
