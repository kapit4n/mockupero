'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.mockupSocketService
 * @description
 * # mockupSocketService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('mockupSocketService', function($cookieStore, $routeParams, $compile, $timeout, GlobalService) {
        var fac = {};
        fac.subscribeToMockupEdit = function($scope) {

            io.socket.post('/mockupEditor/editors', {
                username: $cookieStore.get('username')
            }, function serverResponded(body, JWR) {
                //console.log('Mockup editor post');
            });

            $timeout(function() {
                // move this code to socket services related to mockups
                io.socket.get('/mockupeditor', function serverResponded(body, JWR) {
                    //console.log('here is the get og all mockup editors');
                    //console.log(body);
                    $scope.$apply(function() {
                        for (var i = 0; i < body.length; i++) {
                            $scope.logingLog[body[i].username] = body[i];
                        };
                    });
                    io.socket.get('/mockupeditor/getSocketId', function serverResponded(body, JWR) {
                        //console.log('Socket Id: ');
                    });
                });

                // move this code to socket services related to mockups
                io.socket.get('/mockupeditor/getEditors', {
                    username: $cookieStore.get('username'),
                    roomName: $routeParams.mockupId
                }, function serverResponded(body, JWR) {
                    //console.log('get Editors');
                });

                // method that listen the mockup editors
                io.socket.on('mockupeditor', function(msg) {
                    $scope.$apply(function() {
                        if (msg.verb == 'created') {
                            $scope.logingLog[msg.data.username] = msg.data;
                            $scope.logingLog[msg.data.username].online = true;
                        } else if (msg.data.offline) {
                            $scope.logingLog[msg.data.username] = msg.data;
                            $scope.logingLog[msg.data.username].online = false;
                        } else {
                            $scope.logingLog[msg.data.username] = msg.data;
                        }
                    });
                });
            }, 500);

            io.socket.get('/mockupVersion', {
                username: $cookieStore.get('username')
            }, function serverResponded(body, JWR) {
                //console.log('Subscribe to mockup version');
            });



        }
        return fac;
    });
