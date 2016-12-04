'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:imageItem
 * @description
 * # imageItem
 */
angular.module('mockuperApp')
    .directive('imageItem', function() {
        return {
            templateUrl: 'views/templates/imageItem.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                console.log(scope);
                console.log(element);
                console.log(attrs);
            }
        };
    });
