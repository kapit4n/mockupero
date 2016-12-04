'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:viewProject
 * @description
 * # viewProject
 */
angular.module('mockuperApp')
    .directive('viewProject', function() {
        return {
            templateUrl: 'views/templates/viewProject.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {}
        };
    });
