'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:toolbarItemImage
 * @description
 * # toolbarItemImage
 */
angular.module('mockuperApp')
    .directive('toolbarItemImage', function() {
        return {
            templateUrl: 'views/templates/toolbarItemImage.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });
