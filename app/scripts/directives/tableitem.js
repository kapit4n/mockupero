'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:tableItem
 * @description
 * # tableItem
 */
angular.module('mockuperApp')
    .directive('tableItem', function() {
        return {
            templateUrl: 'views/templates/tableItem.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
