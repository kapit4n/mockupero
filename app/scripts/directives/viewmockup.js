'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:viewMockup
 * @description
 * # viewMockup
 */
angular.module('mockuperApp')
    .directive('viewMockup', function() {
        return {
            templateUrl: 'views/templates/viewMockup.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });
