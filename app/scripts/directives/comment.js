'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:Comment
 * @description
 * # Comment
 */
angular.module('mockuperApp')
    .directive('comment', function() {
        return {
            templateUrl: 'views/templates/comment.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });
