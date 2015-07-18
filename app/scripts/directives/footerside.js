'use strict';

/**
 * @ngdoc directive
 * @name myYoProjectApp.directive:footerSide
 * @description
 * # footerSide
 */
angular.module('myYoProjectApp')
  .directive('footerSide', function () {
    return {
      templateUrl: 'views/templates/footerSide.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
