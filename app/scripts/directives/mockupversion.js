'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:mockupVersion
 * @description
 * # mockupVersion
 */
angular.module('mockuperApp')
    .directive('mockupVersion', function() {
        return {
            templateUrl: 'views/templates/mockupVersion.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
            	scope.reloadMockupVersion = function() {

            	};
            	scope.newMockupVersion = function() {

            	};

            	scope.promoteMockupVersion = function() {

            	};
            }
        };
    });
