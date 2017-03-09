'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:shareProject
 * @description
 * # shareProject
 */
angular.module('mockuperApp')
    .directive('shareProject', ['shareService', 'projectService', 'userService',
        function(shareService, projectService, userService) {
            return {
                templateUrl: 'views/templates/shareProject.html',
                restrict: 'E',
                link: function postLink(scope, element, attrs) {
                    scope.sharedProjectId = '';
                    scope.projectShareEntries = [];
                    scope.userIdToadd = '';
                    scope.permissionIdToadd = '';
                    scope.users = [];
                    scope.permissions = [];
                    scope.userIdToadd = '';

                    scope.reloadUsers = function(projectId) {
                        scope.sharedProjectId = projectId;
                        shareService.loadShareEntries(scope);
                    };

                    userService.user.get().$promise.then(function(result) {
                        scope.users = result;
                    });

                    userService.permission.get().$promise.then(function(result) {
                        scope.permissions = result;
                    });

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
        }
    ]);
