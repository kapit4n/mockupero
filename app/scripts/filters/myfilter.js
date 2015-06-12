'use strict';

/**
 * @ngdoc filter
 * @name myYoProjectApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the myYoProjectApp.
 */
angular.module('myYoProjectApp')
  .filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });
