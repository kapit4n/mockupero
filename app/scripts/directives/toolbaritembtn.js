'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:toolbarItemBtn
 * @description
 * # toolbarItemBtn
 */
angular.module('mockuperApp')
    .directive('toolbarItemBtn', function() {
        return {
            templateUrl: 'views/templates/toolbarItemBtn.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });
