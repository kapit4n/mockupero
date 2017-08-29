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
        'headerService', 'permissionService', 'workflowService', 'commentService', 'GlobalService',
        function($scope, $rootStore, $cookieStore, mockupService, loginService, projectService, $routeParams, $location, $rootScope, breadcrumbService,
            headerService, permissionService, workflowService, commentService, GlobalService) {
            headerService.updateHeader('projects');
            loginService.reloadScope();
            $scope.projectId = $routeParams.projectId;
            $scope.logingLog = {};
            $scope.commentService = commentService;
            $scope.relationName = "Project";
            $scope.currentworkflow = {};

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
                    $scope.relationName = $scope.project.name;
                    $scope.viewObject.title = 'Project View';
                    $scope.viewObject.editUrl = 'project/edit/' + result.id;
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
                    $scope.currentworkflow = result[0];
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
                }, $scope.project, function(result) {}, function(err) {
                    $scope.err = err;
                });
            }
            $scope.gotoDiagram = function() {
                $location.path('/project/' + $scope.projectId + '/navigationDiagram');
            }
            io.socket.get(GlobalService.BASE_PATH + '/mockup');


            $scope.deleteMockup = function(mockupId) {
                mockupService.deleteMockup.get({
                    id: mockupId
                }).$promise.then(function(result) {});
            };

            io.socket.on('mockup', function(msg) {
                if (msg.verb == 'created') {
                    mockupService.mockupById.get({
                            mockupId: msg.id
                        })
                        .$promise.then(function(result) {
                            if ($scope.project && $scope.project.mockups) {
                                $scope.project.mockups.push(result);
                            }
                        }, function(error) {
                            console.error(error);
                        });
                } else if (msg.verb == 'destroyed') {
                    var i = 0;
                    while (i < $scope.project.mockups.length) {
                        if ($scope.project.mockups[i].id == msg.id) {
                            $scope.project.mockups.splice(i, 1);
                            break;
                        }
                        i++;
                    }
                } else if (msg.verb == 'updated') {
                    var i = 0;
                    $scope.$apply(function() {
                        while (i < $scope.project.mockups.length) {
                            if ($scope.project.mockups[i].id == msg.id) {
                                $scope.project.mockups[i] = msg.data;
                                break;
                            }
                            i++;
                        }
                    });
                }
            });
        }
    ]);
