'use strict';

/**
 * @ngdoc directive
 * @name myYoProjectApp.directive:customListDirective
 * @description
 * # customListDirective
 */
angular.module('myYoProjectApp')
  .directive('customListDirective', function () {
    return {
      templateUrl: 'views/customListTemplate.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
