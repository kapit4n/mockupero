'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:headerSide
 * @description
 * # headerSide
 */
angular.module('mockuperApp')
    .directive('headerSide', function() {
        return {
            templateUrl: '/views/templates/headerSide.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
