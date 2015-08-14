'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.userService
 * @description
 * # userService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('userService', function ($resource) {
    var fac = {};
        fac.users = $resource('http://localhost:1337/user', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
        return fac;
  });
