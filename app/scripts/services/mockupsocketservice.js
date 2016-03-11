'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.mockupSocketService
 * @description
 * # mockupSocketService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('mockupSocketService', function ($cookieStore, $routeParams, $compile, $timeout) {
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
                console.log('here is the get og all mockup editors');
                console.log(body);
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

        // I need to listen the changes on the mockups, take care the eventIdentity must it be lowercase
        io.socket.on('mockupversion', function(msg) {
            $scope.$apply(function() {
                if (msg.data.mockupId == $routeParams.mockupId) {
                    var message = '<div style="width:200px; " class="alert"><span class="close" data-dismiss="alert">X</span> <span id="alert_message_text">' + 'Updated by ' + msg.data.username + '</span> </div>';
                    var propertiesDiv = angular.element(document.querySelector('#alert_message'));
                    propertiesDiv.html($compile(message)($scope));
                    $scope.loadMockupItems();
                    // send a little notification by here
                    /*notificationService.sendMail.get({
                        to: 'luis.arce22@gmail.com',
                        subject: 'Subject send from mockup edit design',
                        text: 'This is the text send from mockup edit design'
                    })
                    .$promise.then(function(result) {
                        //console.log(result);
                    });
                    */
                }
            });
        });

    }
    return fac;
  });
