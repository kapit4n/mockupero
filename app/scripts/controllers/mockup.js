'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupCtrl
 * @description
 * # MockupCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupCtrl', ['$scope', '$cookieStore', 'loginService', 'mockupService', 'breadcrumbService',
        '$routeParams', '$rootScope', 'headerService', 'permissionService', 'workflowService',
        function($scope, $cookieStore, loginService, mockupService, breadcrumbService,
            $routeParams, $rootScope, headerService, permissionService, workflowService) {
            loginService.reloadScope();
            headerService.updateHeader('projects');

            $scope.mockupList = mockupService.mockups;
            $scope.mockup = null;
            $scope.logingLog = {};
            $scope.mockupId = $routeParams.mockupId;
            $scope.projectId = $routeParams.projectId;

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

            $scope.loadWorkflow = function() {
                workflowService.workflow.get({
                    where: {
                        name: 'Mockup.' + $scope.mockup.state
                    }
                }).$promise.then(function(result) {
                    $scope.workflows = result[0].next;
                    $scope.currentworkflow = result[0];
                });
            }

            $scope.workflowAction = function(workflow) {
                $scope.mockup.state = workflow.name.substring(7);;
                $scope.save();
                $scope.loadWorkflow();
            }

            $scope.save = function() {
                mockupService.updateMockup.update({
                    id: $scope.mockup.id
                }, $scope.mockup, function(result) {}, function(err) {
                    $scope.err = err;
                });
            }

            $scope.saveSuggest = function() {
                mockupService.updateMockup.update({
                    id: $scope.mockup.id
                }, $scope.mockup, function(result) {}, function(err) {
                    $scope.err = err;
                });
            }

            mockupService.mockupById.get({
                    mockupId: $routeParams.mockupId
                })
                .$promise.then(function(result) {
                    $scope.mockup = result;
                    $scope.viewObject = result;
                    $scope.relationName = $scope.mockup.name;
                    $scope.viewObject.title = 'Mockup View';
                    $scope.viewObject.editUrl = 'project/' + result.project.id + '/mockup/edit/' + result.id;
                    $scope.viewObject.editDesign = 'project/' + result.project.id + '/mockup-edit-design/' + result.id;
                    $scope.viewObject.parentName = result.project.name;
                    $scope.viewObject.parentUrl = '#/project/' + result.project.id;
                    $scope.loadWorkflow();
                    try {
                        permissionService.loadPermission($scope, result.project.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('mockup', $scope.mockup);
                        //$rootScope.$digest();
                    } catch (e) { console.error(e); }
                }, function(error) {
                    console.error(error);
                });
        }
    ]);
