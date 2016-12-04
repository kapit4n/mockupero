'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:leftSideBar
 * @description
 * # leftSideBar
 */
angular.module('mockuperApp')
    .directive('leftSideBar', function() {
        return {
            templateUrl: 'views/templates/leftSideBar.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
