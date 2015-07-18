'use strict';

/**
 * @ngdoc directive
 * @name myYoProjectApp.directive:viewObject
 * @description
 * # viewObject
 */
angular.module('myYoProjectApp')
  .directive('viewObject', function () {
    return {
      templateUrl: 'views/templates/viewObject.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
