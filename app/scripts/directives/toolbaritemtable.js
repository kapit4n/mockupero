'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:toolbarItemTable
 * @description
 * # toolbarItemTable
 */
angular.module('mockuperApp')
    .directive('toolbarItemTable', function() {
        return {
            templateUrl: 'views/templates/toolBarItemTable.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
