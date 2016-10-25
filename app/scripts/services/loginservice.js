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
  	function ($resource, $rootScope, $cookieStore, $location, $window) {
    var fac = {};

    $rootScope.logoutUser = function() {
        io.socket.post('/loginlog/logout', {username: $cookieStore.get('username')}, function serverResponded (body, JWR) {
            console.log('Logout User Success ' + body);
        });
        $cookieStore.remove('username');
        $cookieStore.remove('userId');
        $location.path("/");
        $window.location.reload();
    };

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
    $rootScope.globals = {
      currentUser: {
          username: username,
          tokeb: token
      }
    };
  };
  
  fac.logoutUser = function(username, token) {
    io.socket.post('/loginlog/logout', {username: $cookieStore.get('username')}, function serverResponded (body, JWR) {
        console.log('Logout User Success ' + body);
    });
    $cookieStore.remove('username');
    $cookieStore.remove('userId');
    $location.path("/");
    $window.location.reload();
  };

  fac.reloadScope = function() {
    if ($cookieStore.get('userId')) {
        $rootScope.isAuthenticated  = true;
        $rootScope.userNameLogin = $cookieStore.get('username');
        $rootScope.userId = $cookieStore.get('userId');

    }
  };

    return fac;
  });
