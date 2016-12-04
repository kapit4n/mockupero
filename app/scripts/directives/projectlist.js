'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:projectList
 * @description
 * # projectList
 */
angular.module('mockuperApp')
    .directive('projectList', function() {
        return {
            templateUrl: 'views/templates/projectList.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
