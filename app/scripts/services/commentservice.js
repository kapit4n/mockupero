'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.CommentService
 * @description
 * # CommentService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('commentService', ['$resource', '$cookieStore', '$rootScope', 'projectService', 'GlobalService',
        function($resource, $cookieStore, $rootScope, projectService, GlobalService) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var fac = {};

            fac.getComments = $resource(GlobalService.BASE_PATH + '/comment', {}, {
                get: {
                    method: 'GET',
                    isArray: true
                }
            });

            fac.commentById = $resource(GlobalService.BASE_PATH + '/comment/:id', {
                id: '@id'
            }, {
                get: {
                    method: 'GET'
                }
            });

            fac.createComment = $resource(GlobalService.BASE_PATH + '/comment/', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.updateComment = $resource(GlobalService.BASE_PATH + '/comment/:id', {}, {
                update: {
                    method: 'PUT'
                }
            });

            fac.deleteComment = $resource(GlobalService.BASE_PATH + '/comment/:id', {}, {
                delete: {
                    method: 'DELETE'
                }
            });

            fac.share = function($scope) {
                if ($scope.newComment) {
                    mockupSuggestId: $scope.mockupSuggestId
                    fac.createComment.save({
                        comment: $scope.newComment,
                        userId: $cookieStore.get('userId'),
                        userName: $rootScope.userNameLogin,
                        relationId: $scope.relationId,
                        relationType: $scope.relationType,
                        relationName: $scope.relationName,
                        isMockupSuggest: $scope.isMockupSuggest,
                        mockupSuggestId: $scope.mockupSuggestId
                    }, function(result) {
                        try {
                            $scope.reloadComments();
                        } catch (ez) {}
                        $scope.newComment = '';
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            };

            fac.update = function($scope) {
                fac.updateComment.update({
                    id: $scope.relationId
                }, $scope.editComment, function(result) {
                    $window.location.href = '#/project/' + $scope.project.id;
                }, function(err) {
                    $scope.err = err;
                });
            };

            fac.reloadComments = function($scope, relationId) {
                fac.getComments.get({
                    where: {
                        relationId: relationId
                    },
                    sort: 'createdAt DESC'
                }).$promise.then(function(result) {
                    $scope.comments = result;
                }, function(err) {
                    $scope.err = err;
                });
            };

            fac.reloadCommentByProject = function($scope, relationId) {
                projectService.projectById.get({
                        projectId: relationId,
                        sort: 'createdAt DESC'
                    })
                    .$promise.then(function(project) {
                        var ids = [relationId];

                        for (var i = 0; i < project.mockups.lenght; i++) {
                            ids.push(project[i].id);
                        }
                        fac.getComments.get({
                            where: {
                                relationId: ids
                            },
                            sort: 'createdAt DESC'
                        }).$promise.then(function(result) {
                            $scope.comments = result;
                        }, function(err) {
                            $scope.err = err;
                        });
                    });
            };

            fac.reloadLastComments = function($scope) {
                fac.getComments.get({
                    sort: 'createdAt DESC',
                    limit: 50
                }).$promise.then(function(result) {
                    $scope.comments = result;
                }, function(err) {
                    $scope.err = err;
                });
            };

            fac.reloadCommentsByUser = function($scope) {
                fac.getComments.get({
                    where: {
                        or: [
                            { relationId: $scope.relationId },
                            { userId: $scope.relationId }
                        ]
                    },
                    sort: 'createdAt DESC',
                    limit: 50
                }).$promise.then(function(result) {
                    $scope.comments = result;
                }, function(err) {
                    $scope.err = err;
                });
            };

            return fac;
        }
    ]);
