'use strict';

/**
 * @ngdoc directive
 * @name myYoProjectApp.directive:leftSideBar
 * @description
 * # leftSideBar
 */
angular.module('myYoProjectApp')
  .directive('leftSideBar', function () {
    return {
      templateUrl: 'views/templates/leftSideBar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
