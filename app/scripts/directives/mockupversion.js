'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:mockupVersion
 * @description
 * # mockupVersion
 */
angular.module('mockuperApp')
    .directive('mockupVersion', ['$cookieStore', '$timeout', 'mockupVersionService', '$routeParams',
        function($cookieStore, $timeout, mockupVersionService, $routeParams) {
            return {
                templateUrl: 'views/templates/mockupVersion.html',
                restrict: 'E',
                link: function postLink(scope, element, attrs) {

                }
            };
        }
    ]);
