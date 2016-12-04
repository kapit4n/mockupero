'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:toolbarContainer
 * @description
 * # toolbarContainer
 */
angular.module('mockuperApp')
    .directive('toolbarContainer', function() {
        return {
            templateUrl: 'views/templates/toolbarContainer.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
