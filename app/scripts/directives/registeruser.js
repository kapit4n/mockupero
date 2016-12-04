'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:registerUser
 * @description
 * # registerUser
 */
angular.module('mockuperApp')
    .directive('registerUser', function() {
        return {
            templateUrl: 'views/templates/registerUser.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
