'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:presentation
 * @description
 * # presentation
 */
angular.module('mockuperApp')
    .directive('presentation', 'GlobalService', function(GlobalService) {
        return {
            templateUrl: 'views/templates/presentation.html',
            restrict: 'E',
            scope: false,
            link: function postLink(scope, element, attrs) {
                scope.globalService = GlobalService;
                scope.goPrev = function() {
                    $("#myCarousel").carousel("prev");
                };

                scope.goNext = function() {
                    $("#myCarousel").carousel("next");
                };

                /*
                 * This function show the page in full screen, it just works for chrome
                */
                scope.fullScreen = function() {
                    document.documentElement.webkitRequestFullscreen();
                };

                /*
                 * This function exits from full screen, it just works for chrome
                */
                scope.exitFullScreen = function() {
                    document.webkitExitFullscreen();
                };

            }
        };
    });
