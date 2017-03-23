'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:ProjectEditCtrl
 * @description
 * # ProjectEditCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('ProjectEditCtrl', ['$rootScope', '$scope', 'loginService', '$window', '$routeParams', 'projectService', 'commentService', 'breadcrumbService', 'headerService',
        function($rootScope, $scope, loginService, $window, $routeParams, projectService, commentService, breadcrumbService, headerService) {
            loginService.reloadScope();
            headerService.updateHeader('projects');
            $scope.project = null;
            $scope.commentService = commentService;

            projectService.projectById.get({
                    projectId: $routeParams.projectId
                })
                .$promise.then(function(result) {
                    $scope.project = result;
                    try {
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project', $scope.project);
                        $rootScope.$digest();
                    } catch (e) {}
                });

            $scope.saveProject = function(editProjectForm) {
                if (editProjectForm.$valid) {
                    projectService.updateProject.update({
                        id: $scope.project.id
                    }, $scope.project, function(result) {
                        projectService.publishUpdate($scope, result);
                        $window.location.href = '#!/project/' + $scope.project.id;
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            }

            $scope.cancel = function() {
                $window.location.href = '#!/project/' + $scope.project.id;
            }

            $scope.projectTypes = projectService.projectTypes;

        }
    ]);
