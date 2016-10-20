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
        'headerService', 'permissionService', 'commentService',
        function($scope, $rootStore, $cookieStore, mockupService, loginService, projectService, $routeParams, $location, $rootScope, breadcrumbService,
            headerService, permissionService, commentService) {
            headerService.updateHeader('projects');
            loginService.reloadScope();
            $scope.projectId = $routeParams.projectId;
            $scope.logingLog = {};

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

            $scope.workflows = [{
                name: 'start',
                functionName: '',
                className: 'btn-primary'
            }, {
                name: 'close',
                functionName: '',
                className: 'btn-success'
            }, {
                name: 'abandon',
                functionName: '',
                className: 'btn-danger'
            }];
            $scope.mockups = [{
                id: 0,
                name: 'Mockup 1',
                img: 'http://community.protoshare.com/wp-content/uploads/2010/12/example4-anim.gif',
                description: 'abandon'
            }, {
                id: 1,
                name: 'Mockup 2',
                img: 'http://cameronbarrett.com/images/lg_ia1.gif',
                description: 'abandon'
            }];
            $scope.project = null;
            $scope.viewObject = null;
            projectService.projectById.get({
                    projectId: $routeParams.projectId
                })
                .$promise.then(function(result) {
                    $scope.viewObject = result;
                    $scope.project = result;
                    $scope.viewObject.title = 'Project View';
                    $scope.viewObject.editUrl = 'project/edit/' + result.id;
                    $scope.reloadComments();
                    try {
                        permissionService.loadPermission($scope, result.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project', $scope.project);
                        //$rootScope.$digest();
                    } catch (e) { console.log(e); }
                });
            $scope.share = function() {
                if ($scope.newComment) {
                    commentService.createComment.save({
                        comment: $scope.newComment,
                        userId: $cookieStore.get('userId'),
                        userName: $rootStore.userNameLogin,
                        projectId: $scope.project.id,
                        projectName: $scope.project.name
                    }, function(result) {
                        $scope.reloadComments();
                        $scope.newComment = '';
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            }

            $scope.reloadComments = function(projectId) {
                commentService.getComments.get({
                    where: {
                        projectId: $scope.project.id
                    },
                    sort: 'createdAt DESC'
                }).$promise.then(function(result) {
                    $scope.comments = result;
                }, function(err) {
                    $scope.err = err;
                });
            };

            
        }
    ]);
