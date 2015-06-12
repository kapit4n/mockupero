'use strict';

/**
 * @ngdoc directive
 * @name myYoProjectApp.directive:myDirective
 * @description
 * # myDirective
 */
angular.module('myYoProjectApp')
  .directive('myDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the myDirective directive');
      }
    };
  });
