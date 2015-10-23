'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MainCtrl', ['$scope', '$cookieStore', 'mockupService', 'projectService', 'userService', '$location', '$rootScope',
        function($scope, $cookieStore, mockupService, projectService, userService, $location, $rootScope) {

            $scope.logingLog = {};
            io.socket.get('/loginlog', function serverResponded (body, JWR) {
                $scope.$apply(function() {
                    for (var i = 0; i < body.length; i++) {
                        $scope.logingLog[body[i].username] = body[i];
                        $scope.logingLog[body[i].username].online = false;
                    };
                });
            });

            io.socket.on('loginlog', function onServerSentEvent (msg) {
                $scope.$apply(function(){
                    $scope.logingLog[msg.data.username] = msg.data;
                    $scope.logingLog[msg.data.username].online = true;// ((new Date(msg.data.createdAt)).getTime())
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
            });

            userService.permission.get().$promise.then(function(result) {
                $scope.permissions = result;
            });

            $rootScope.logout = function() {
                $rootScope.isAuthenticated  = false;
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
                    projectService.projects.get({
                            where: {
                                name: {
                                    "like": "%" + $scope.searchName + "%"
                                },
                                userId: $cookieStore.get('userId')
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
            }

            $scope.reloadProject(1);
        }
    ]);
