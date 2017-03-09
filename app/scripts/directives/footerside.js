'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:footerSide
 * @description
 * # footerSide
 */
angular.module('mockuperApp')
    .directive('footerSide', function() {
        return {
            templateUrl: 'views/templates/footerSide.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });
