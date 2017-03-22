'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:Comment
 * @description
 * # Comment
 */
angular.module('mockuperApp')
    .directive('comment', ['$cookieStore', 'commentService',
        function($cookieStore, commentService) {
            return {
                templateUrl: 'views/templates/comment.html',
                restrict: 'E',
                link: function postLink(scope, element, attrs) {
                    scope.newCommentFlag = false;
                    scope.comments = [];
                    scope.relationId = attrs.relation;
                    scope.relationType = attrs.relationType;
                    scope.relationType = attrs.relationtype;

                    scope.addComment = function() {
                        scope.newCommentFlag = true;
                    };

                    scope.reloadComments = function() {
                        scope.newCommentFlag = false;
                        commentService.reloadComments(scope, attrs.relation);
                    };

                    scope.shareComment = function() {
                        commentService.share(scope);
                    };

                    scope.deleteComment = function(commentId) {
                        commentService.deleteComment.delete({
                            id: commentId
                        }).$promise.then(function(result) {
                            scope.reloadComments();
                        }, function(err) {
                            console.error(err)
                        });
                    };

                    scope.loadEdit = function(commentId) {
                        commentService.commentById.get({
                            id: commentId
                        }).$promise.then(function(result) {
                            scope.commentToEdit = result;
                        }, function(err) {
                            console.error(err);
                        });
                    };

                    scope.updateComment = function() {
                        commentService.updateComment.update({
                            id: scope.commentToEdit.id
                        }, scope.commentToEdit, function(result) {
                            scope.reloadComments();
                        }, function(err) {
                            scope.err = err;
                        });
                    };
                    scope.reloadComments();
                }
            };
        }
    ]);
