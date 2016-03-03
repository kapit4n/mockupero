'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.chatService
 * @description
 * # chatService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('chatService', function ($http, $rootScope, $timeout) {
    var fac = {};

    fac.subscribe  = function($scope) {
        io.socket.get('http://localhost:1337/chat/addconv?roomName="roomNameTest"');
        // get all existing date
        $http.get('http://localhost:1337/chat')
            .success(function(success_data) {
                $scope.chatList = success_data;
                $timeout(function() {
                    var objDiv = document.getElementById("chatContainer");
                    objDiv.scrollTop = objDiv.scrollHeight;
                    $scope.chatMessage = "";
                    console.log('Updated the scrollTop');
                }, 200);
                
            });

        io.socket.on('chat', function(obj) {
            console.log('created something');
            if (obj.verb === 'created') {
                $scope.chatList.push(obj.data);
                $scope.$digest();
                $timeout(function() {
                    var objDiv = document.getElementById("chatContainer");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 200);
                $scope.chatMessage = "";
            }
        });
    };

    fac.sendMsg = function($scope) {
        io.socket.post('http://localhost:1337/chat/addconv/', {
            user: $rootScope.userNameLogin,
            message: $scope.chatMessage
        });
        $timeout(function() {
                var objDiv = document.getElementById("chatContainer");
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 200);
        $scope.chatMessage = "";
    };
    return fac;
  });
