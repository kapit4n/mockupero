'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:shareProject
 * @description
 * # shareProject
 */
angular.module('mockuperApp')
    .directive('shareProject', ['shareService', 'projectService', function(shareService, projectService) {
        return {
            templateUrl: 'views/templates/shareProject.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.sharedProjectId = '';
                scope.projectShareEntries = [];
                scope.userIdToadd = '';
                scope.permissionIdToadd = '';

                scope.reloadUsers = function(projectId) {
                    scope.sharedProjectId = projectId;
                    shareService.loadShareEntries(scope);
                };

                scope.addUsertoProject = function() {
                    var userProjectTuple = {
                        user: scope.userIdToadd,
                        project: scope.sharedProjectId,
                        permission: scope.permissionIdToadd
                    };
                    projectService.shareProject.save(userProjectTuple).$promise.then(function(result) {
                        scope.reloadUsers(scope.sharedProjectId);
                    });
                }

                scope.removeProjectShare = function(shareProjectId, projectId) {
                    projectService.deleteProjectShare.delete({
                        id: shareProjectId
                    }).$promise.then(function(result) {
                        scope.reloadUsers(projectId);
                    });
                };

            }
        };
    }]);
