'use strict';

/**
 * @ngdoc filter
 * @name mockuperApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the mockuperApp.
 */
angular.module('mockuperApp')
  .filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });
