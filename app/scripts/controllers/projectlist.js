'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:ProjectlistCtrl
 * @description
 * # ProjectlistCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('ProjectlistCtrl', ['$scope', '$cookieStore', 'mockupService', 'projectService', 'loginService', 'userService', '$location', '$rootScope', '$window', '$http', '$timeout', 'breadcrumbService', 'headerService',
        function($scope, $cookieStore, mockupService, projectService, loginService, userService, $location, $rootScope, $window, $http, $timeout, breadcrumbService, headerService) {

            $scope.logingLog = {};
            $scope.chatList = [];
            loginService.reloadScope();
            headerService.updateHeader('projects');
            $scope.userName = $rootScope.userNameLogin;

            io.socket.get('/project', function serverResponded(body, JWR) {
                //console.log('project get');
            });

            io.socket.get('/loginlog', function serverResponded(body, JWR) {
                $scope.$apply(function() {
                    for (var i = 0; i < body.length; i++) {
                        $scope.logingLog[body[i].username] = body[i];
                    };
                });
            });

            io.socket.on('loginlog', function onServerSentEvent(msg) {
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
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project-list', '');

            $scope.projectPages = [];
            $scope.projectShareEntries = [];
            $scope.users = [];
            $scope.sortAsc = true;
            $scope.userIdToadd = '';
            $scope.sharedProjectId = '';
            $scope.permissionIdToadd = '';

            userService.user.get().$promise.then(function(result) {
                $scope.users = result;
                //console.log($scope.users);
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
                            userProjectIds[i] = result[i].project;
                        }
                        projectService.projects.get({
                                where: {
                                    or: [{
                                        userId: $cookieStore.get('userId'),
                                    }, {
                                        id: userProjectIds
                                    }],
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

            $scope.reloadProject(1);

            io.socket.get('http://localhost:1337/chat/addconv?roomName="roomNameTest"');
            // get all existing date
            $http.get('http://localhost:1337/chat')
                .success(function(success_data) {
                    $scope.chatList = success_data;
                    $timeout(function() {
                        // looks like we will not have chat here by now
                        /*var objDiv = document.getElementById("chatContainer");
                        objDiv.scrollTop = objDiv.scrollHeight;
                        $scope.chatMessage = "";
                        //console.log('Updated the scrollTop');
                        */
                    }, 200);

                });

            io.socket.on('chat', function(obj) {
                if (obj.verb === 'created') {
                    $scope.chatList.push(obj.data);
                    $scope.$digest();
                    $timeout(function() {
                        var objDiv = document.getElementById("chatContainer");
                        objDiv.scrollTop = objDiv.scrollHeight;
                    }, 200);
                    $scope.chatMessage = "";
                }
            });

            $scope.sendMsg = function() {
                io.socket.post('http://localhost:1337/chat/addconv/', {
                    user: $rootScope.userNameLogin,
                    message: $scope.chatMessage
                });
                $timeout(function() {
                    var objDiv = document.getElementById("chatContainer");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 200);
                $scope.chatMessage = "";
            };

        }
    ]);
