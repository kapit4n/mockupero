'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:labelItem
 * @description
 * # labelItem
 */
angular.module('mockuperApp')
    .directive('labelItem', function() {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the labelItem directive');
            }
        };
    });
