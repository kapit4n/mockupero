'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:lastNews
 * @description
 * # lastNews
 */
angular.module('mockuperApp')
    .directive('lastNews', ['commentService', 'GlobalService',
        function(commentService, GlobalService) {
            return {
                templateUrl: 'views/templates/last-news.html',
                restrict: 'E',
                link: function postLink(scope, element, attrs) {
                    scope.globalService = GlobalService;
                    scope.comments = [];
                    scope.relationId = '';

                    scope.reloadComments = function() {
                        scope.newCommentFlag = false;
                        commentService.reloadLastComments(scope);
                    };

                    scope.reloadComments();
                }
            };
        }
    ]);
