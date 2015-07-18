'use strict';

/**
 * @ngdoc directive
 * @name myYoProjectApp.directive:headerSide
 * @description
 * # headerSide
 */
angular.module('myYoProjectApp')
  .directive('headerSide', function () {
    return {
      templateUrl: '/views/templates/headerSide.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
