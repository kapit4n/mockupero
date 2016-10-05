'use strict';

angular.module('mockuperApp')
    .directive("addbuttons", function($compile) {
        return function(scope, element, attrs) {
            element.bind("click", function() {
                scope.count++;
                angular.element(document.getElementById('space-for-buttons')).append($compile("<div><button data-alert=" + scope.count + ">Show alert #" + scope.count + "</button></div>")(scope));
            });
        };
    });
