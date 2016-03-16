'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MainCtrl', ['$scope', '$cookieStore', 'mockupService', 'projectService', 'loginService', 'userService', '$location', '$rootScope', '$window', '$http', '$timeout', 'headerService', 'chatService',
        function($scope, $cookieStore, mockupService, projectService, loginService, userService, $location, $rootScope, $window, $http, $timeout, headerService, chatService) {

            $scope.logingLog = {};
            loginService.reloadScope();
            $scope.chatCollapsed = false;
            headerService.updateHeader('home');
            $scope.userName = $rootScope.userNameLogin;
            io.socket.get('/project', function serverResponded(body, JWR) {
                console.log('project get');
            });

            io.socket.get('/loginlog', function serverResponded(body, JWR) {
                console.log('Login log get');
                console.log(body);
                $scope.$apply(function() {
                    for (var i = 0; i < body.length; i++) {
                        $scope.logingLog[body[i].username] = body[i];
                    };
                });
            });

            io.socket.on('loginlog', function onServerSentEvent(msg) {
                console.log('on login log');
                console.log(msg);
                $scope.$apply(function() {
                    if (msg.verb == 'update') {
                        $scope.logingLog[msg.data.username] = msg.data;
                        $scope.logingLog[msg.data.username].online = msg.data.online; // ((new Date(msg.data.createdAt)).getTime())
                    } else {
                        $scope.logingLog[msg.data.username] = msg.data;
                        $scope.logingLog[msg.data.username].online = msg.data.online; // ((new Date(msg.data.createdAt)).getTime())
                    }
                });
            });

            $scope.currentPage = 1;
            $scope.pageSize = 2;
            $scope.projects = [];
            $scope.searchName = '';
            $scope.totalSize = 0;
            $scope.totalPages = 0;
            $rootScope.breadcrumb = mockupService.breadcrumb['home'];
            $scope.projectPages = [];
            $scope.projectShareEntries = [];
            $scope.users = [];
            $scope.sortAsc = true;
            $scope.userIdToadd = '';
            $scope.sharedProjectId = '';
            $scope.permissionIdToadd = '';

            userService.user.get().$promise.then(function(result) {
                $scope.users = result;
                console.log($scope.users);
            });

            userService.permission.get().$promise.then(function(result) {
                $scope.permissions = result;
            });

            $rootScope.logout = function() {
                $rootScope.isAuthenticated = false;
            };

            $scope.addProject = function() {
                $location.path('/project-new');
            };

            $scope.makePagination = function() {
                $scope.projectPages = [];
                var isCurrentAux;
                var pageLabelText;

                for (var i = 1; i <= $scope.totalPages; i++) {
                    isCurrentAux = (i == $scope.currentPage);
                    pageLabelText = i;
                    if (i == 1) {
                        pageLabelText = 'First';
                    } else if (i == $scope.totalPages) {
                        pageLabelText = 'Last';
                    }
                    var pageItem = {
                        isCurrent: isCurrentAux,
                        pageLabel: pageLabelText,
                        pageIndex: i
                    };
                    $scope.projectPages.push(pageItem);
                };
            };

            $scope.sortByName = function() {
                $scope.sortAsc = !$scope.sortAsc;
                $scope.reloadProject($scope.currentPage);
            };

            $scope.reloadProject = function(currentPage) {
                $scope.currentPage = currentPage;
                projectService.countProject.get({
                    name: $scope.searchName
                }).$promise.then(function(countResult) {
                    $scope.totalSize = countResult.count;

                    $scope.totalPages = parseInt($scope.totalSize / $scope.pageSize);
                    if (($scope.totalPages * $scope.pageSize) < $scope.totalSize) {
                        $scope.totalPages += 1;
                    }

                    if ($scope.totalPages < $scope.currentPage) {
                        $scope.currentPage -= 1;
                    }
                    var sortA = $scope.sortAsc ? 'ASC' : 'DESC';

                    projectService.getProjectUsers.get({
                        where: {
                            user: $cookieStore.get('userId'),

                        }
                    }).$promise.then(function(result) {
                        var userProjectIds = [];
                        for (var i = 0; i < result.length; i++) {
                            userProjectIds[i] = result[i].project.id;
                            console.log(userProjectIds[i]);
                        }
                        projectService.projects.get({
                            where: {
                                or: [
                                    {
                                        userId: $cookieStore.get('userId'),
                                    },
                                    {
                                        id: userProjectIds
                                    }
                                ],
                                name: {
                                    "like": "%" + $scope.searchName + "%"
                                }
                            },
                            limit: $scope.pageSize,
                            skip: (($scope.currentPage - 1) * $scope.pageSize),
                            sort: 'name ' + sortA
                        })
                        .$promise.then(function(result) {
                            $scope.projects = result;
                            $scope.makePagination();
                        });

                    });

                    
                });
            };

            $scope.deleteProject = function(projectId) {
                projectService.deleteProject.get({
                    id: projectId
                }).$promise.then(function(result) {

                    $scope.reloadProject($scope.currentPage);
                });
            };

            $scope.reloadUsers = function(projectId) {
                $scope.sharedProjectId = projectId;
                projectService.getProjectUsers.get({
                    where: {
                        project: $scope.sharedProjectId
                    }
                }).$promise.then(function(result) {
                    console.log(result);
                    $scope.projectShareEntries = [];
                    result.forEach(function(projectShare) {
                        $scope.projectShareEntries.push(projectShare);
                    });
                });
            };

            $scope.addUsertoProject = function() {
                var userProjectTuple = {
                    user: $scope.userIdToadd,
                    project: $scope.sharedProjectId,
                    permission: $scope.permissionIdToadd
                };
                projectService.shareProject.save(userProjectTuple).$promise.then(function(result) {
                    $scope.reloadUsers($scope.sharedProjectId);
                });
            }

            $scope.removeProjectShare = function(shareProjectId, projectId) {
                projectService.deleteProjectShare.delete({
                    id: shareProjectId
                }).$promise.then(function(result) {
                    $scope.reloadUsers(projectId);
                });
            };

            chatService.subscribe($scope);
            $scope.sendMsg = function() {
                chatService.sendMsg($scope);
            }

            $scope.changeChat = function() {
                console.log('Updated chatCollapsed');
                $scope.chatCollapsed = !$scope.chatCollapsed;
            };

            $scope.reloadProject(1);
        }
    ]);