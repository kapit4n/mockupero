'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:addObject
 * @description
 * # addObject
 */
angular.module('mockuperApp')
    .directive('addObject', function() {
        return {
            templateUrl: 'views/templates/addObject.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
