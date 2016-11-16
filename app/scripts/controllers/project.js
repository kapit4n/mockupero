'use strict';

/**
 * @ngdoc function
 * @name moCkUperapp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('ProjectCtrl', ['$scope', '$rootScope', '$cookieStore', 'mockupService', 'loginService', 'projectService', '$routeParams', '$location', '$rootScope', 'breadcrumbService',
        'headerService', 'permissionService', 'commentService', 'workflowService',
        function($scope, $rootStore, $cookieStore, mockupService, loginService, projectService, $routeParams, $location, $rootScope, breadcrumbService,
            headerService, permissionService, commentService, workflowService) {
            headerService.updateHeader('projects');
            loginService.reloadScope();
            $scope.projectId = $routeParams.projectId;
            $scope.logingLog = {};
            $scope.relationId = 0;
            $scope.relationName = "Project";

            $scope.addMockup = function() {
                $location.path('/project/' + $scope.projectId + '/mockup-new');
            };

            io.socket.get('/loginlog', function serverResponded(body, JWR) {
                $scope.$apply(function() {
                    for (var i = 0; i < body.length; i++) {
                        $scope.logingLog[body[i].username] = body[i];
                    };
                });
            });

            io.socket.on('loginlog', function onServerSentEvent(msg) {
                $scope.$apply(function() {
                    $scope.logingLog[msg.data.username] = msg.data;
                    $scope.logingLog[msg.data.username].online = true; // ((new Date(msg.data.createdAt)).getTime())
                });
            });

            $scope.project = null;
            $scope.viewObject = null;
            projectService.projectById.get({
                    projectId: $routeParams.projectId
                })
                .$promise.then(function(result) {
                    $scope.viewObject = result;
                    $scope.project = result;
                    $scope.relationId = $scope.project.id;
                    $scope.relationName = $scope.project.name;
                    $scope.viewObject.title = 'Project View';
                    $scope.viewObject.editUrl = 'project/edit/' + result.id;
                    $scope.reloadComments();
                    $scope.loadWorkflow();
                    try {
                        permissionService.loadPermission($scope, result.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project', $scope.project);
                        //$rootScope.$digest();
                    } catch (e) { console.log(e); }
                });

            $scope.loadWorkflow = function() {
                workflowService.workflow.get({
                    where: {
                        name: $scope.project.state
                    }
                }).$promise.then(function(result) {
                    $scope.workflows = result[0].next;
                });
            }
            $scope.workflowAction = function(workflow) {
                $scope.project.state = workflow.name;
                $scope.save();
                $scope.loadWorkflow();
            }

            $scope.save = function() {
                projectService.updateProject.update({
                    id: $scope.project.id
                }, $scope.project, function(result) {

                }, function(err) {
                    $scope.err = err;
                });
            }
        }
    ]);
