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
        function($resource, $rootScope, $cookieStore, $cookies, $location, $window, userService, GlobalService) {
            var fac = {};

            $rootScope.logoutUser = function() {
                io.socket.post('/loginlog/logout', { username: $cookieStore.get('username') }, function serverResponded(body, JWR) {
                    console.log('Logout User Success ' + body);
                });
                $cookieStore.remove('username');
                $cookieStore.remove('userId');
                $cookieStore.put('sails.sid', 'XX');
                $cookieStore.remove('email');
                $rootScope.isAuthenticated = false;
                $location.path("/login");
                $window.location.reload();
            };

            fac.loginUser = $resource(GlobalService.BASE_PATH + '/login', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.loginLog = $resource(GlobalService.BASE_PATH + '/loginlog', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.loginLogLogin = $resource(GlobalService.BASE_PATH + '/loginlog/login', {}, {
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

            fac.reloadScope = function() {
                if ($cookieStore.get('userId')) {
                    userService.userById.get({
                            userId: $cookieStore.get('userId')
                        })
                        .$promise.then(function(err, result) {
                            $rootScope.isAuthenticated = true;
                            $rootScope.userNameLogin = $cookieStore.get('username');
                            $rootScope.userId = $cookieStore.get('userId');
                        });
                } else {
                    $location.path("/login");
                }
            };

            return fac;
        });
