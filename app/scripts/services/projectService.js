'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.myService
 * @description
 * # myService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('projectService', function($resource, GlobalService) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};

        fac.projects = $resource(GlobalService.BASE_PATH + '/project', {
            where: '@where',
            limit: '@limit'
        }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.projectById = $resource(GlobalService.BASE_PATH + '/project/:projectId', {
            projectId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.deleteProject = $resource(GlobalService.BASE_PATH + '/project/:id', {}, {
            get: {
                method: 'DELETE'
            }
        });

        fac.createProject = $resource(GlobalService.BASE_PATH + '/project/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateProject = $resource(GlobalService.BASE_PATH + '/project/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        fac.countProject = $resource(GlobalService.BASE_PATH + '/project/count', {}, {
            get: {
                method: 'GET'
            }
        });

        fac.shareProject = $resource(GlobalService.BASE_PATH + '/projectShare', {}, {
            get: {
                method: 'POST'
            }
        });

        fac.getProjectUsers = $resource(GlobalService.BASE_PATH + '/projectShare', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.deleteProjectShare = $resource(GlobalService.BASE_PATH + '/projectShare/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });

        fac.reloadProject = function($scope, $cookieStore) {
            fac.getProjectUsers.get({
                where: {
                    user: $cookieStore.get('userId'),
                }
            }).$promise.then(function(result) {
                var userProjectIds = [];
                for (var i = 0; i < result.length; i++) {
                    if (result[i].project) {
                        userProjectIds[i] = result[i].project.id;
                    }
                }

                fac.countProject.get({
                    where: {
                        or: [{
                            userId: $cookieStore.get('userId'),
                        }, {
                            id: userProjectIds
                        }],
                        name: {
                            "like": "%" + $scope.searchName + "%"
                        }
                    }
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

                    fac.projects.get({
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
        }

        fac.publishCreate = function($scope, project) {
            $scope.newComment = "Project (" + project.name + ") has been Created";
            $scope.relationName = project.name;
            $scope.relationId = project.id;
            $scope.relationType = 'project';
            $scope.commentService.share($scope);
        };

        fac.publishUpdate = function($scope, project) {
            $scope.newComment = "Project (" + project.name + ") has been Updated";
            $scope.relationName = project.name;
            $scope.relationId = project.id;
            $scope.relationType = 'project';
            $scope.commentService.share($scope);
        };

        fac.projectTypes = ['Type 1', 'Type 2'];

        return fac;
    });
