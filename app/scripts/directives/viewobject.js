'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:viewObject
 * @description
 * # viewObject
 */
angular.module('mockuperApp')
    .directive('viewObject', function() {
        return {
            templateUrl: 'views/templates/viewObject.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });
