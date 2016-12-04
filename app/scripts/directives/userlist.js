'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:userlist
 * @description
 * # userlist
 */
angular.module('mockuperApp')
    .directive('userlist', function() {
        return {
            templateUrl: 'views/templates/userList.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
