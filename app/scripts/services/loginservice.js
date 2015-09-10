'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.loginService
 * @description
 * # loginService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('loginService', function ($resource) {
    var fac = {};
    fac.loginUser = $resource('http://localhost:1337/login', {}, {
        save: {
            method: 'POST'
        }
    });
    return fac;
  });
