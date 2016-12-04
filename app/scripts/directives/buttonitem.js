'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:buttonItem
 * @description
 * # buttonItem
 */
angular.module('mockuperApp')
    .directive('buttonItem', function() {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the buttonItem directive');
            }
        };
    });
