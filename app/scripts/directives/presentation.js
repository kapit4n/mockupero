'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:presentation
 * @description
 * # presentation
 */
angular.module('mockuperApp')
    .directive('presentation', function() {
        return {
            templateUrl: 'views/templates/presentation.html',
            restrict: 'E',
            scope: false,
            link: function postLink(scope, element, attrs) {
                scope.goPrev = function() {
                    $("#myCarousel").carousel("prev");
                };
                scope.goNext = function() {
                    $("#myCarousel").carousel("next");
                };

            }
        };
    });
