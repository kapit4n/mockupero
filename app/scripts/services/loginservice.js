'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.loginService
 * @description
 * # loginService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('loginService', 
  	function ($resource, $rootScope) {
    var fac = {};

    fac.loginUser = $resource('http://localhost:1337/login', {}, {
        save: {
            method: 'POST'
        }
    });

    fac.loginLog = $resource('http://localhost:1337/loginlog', {}, {
        save: {
            method: 'POST'
        }
    });

    fac.loginLogLogin = $resource('http://localhost:1337/loginlog/login', {}, {
        save: {
            method: 'POST'
        }
    });

  fac.registerUser = function(username, token) {
  	$rootScope.isAuthenticated = true;
  	$rootScope.globals = {
  		currentUser: {
  		    username: username,
  		    tokeb: token
  		}
  	};
  };

    return fac;
  });
