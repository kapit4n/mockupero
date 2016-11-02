'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.CommentService
 * @description
 * # CommentService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('commentService', function($resource) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};

        fac.getComments = $resource('http://localhost:1337/comment', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.commentById = $resource('http://localhost:1337/comment/:id', {
            id: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.createComment = $resource('http://localhost:1337/comment/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateComment = $resource('http://localhost:1337/comment/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        fac.deleteComment = $resource('http://localhost:1337/comment/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });

        fac.share = function($scope, $cookieStore, $rootStore, relationId, relationName) {
            if ($scope.newComment) {
                fac.createComment.save({
                    comment: $scope.newComment,
                    userId: $cookieStore.get('userId'),
                    userName: $rootStore.userNameLogin,
                    relationId: relationId,
                    relationName: relationName
                }, function(result) {
                    $scope.reloadComments();
                    $scope.newComment = '';
                }, function(err) {
                    $scope.err = err;
                });
            }
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

        return fac;
    });
