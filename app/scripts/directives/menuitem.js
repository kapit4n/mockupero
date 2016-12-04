'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:menuItem
 * @description
 * # menuItem
 */
angular.module('mockuperApp')
    .directive('menuItem', function() {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the menuItem directive');
            }
        };
    });
