'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:chatDirective
 * @description
 * # chatDirective
 */
angular.module('mockuperApp')
  .directive('chatDirective', function () {
    return {
       templateUrl: 'views/templates/chatDirective.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
