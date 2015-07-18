'use strict';

/**
 * @ngdoc directive
 * @name myYoProjectApp.directive:projectList
 * @description
 * # projectList
 */
angular.module('myYoProjectApp')
  .directive('projectList', function () {
    return {
      templateUrl: 'views/templates/projectList.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
