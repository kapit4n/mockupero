'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:inputTextItem
 * @description
 * # inputTextItem
 */
angular.module('mockuperApp')
    .directive('inputTextItem', function() {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the inputTextItem directive');
            }
        };
    });
