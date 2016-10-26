'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.chatService
 * @description
 * # chatService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('chatService', function($http, $rootScope, $timeout) {
        var fac = {};

        var chatServiceLoad = function($scope) {
            if ($scope.chatRoom != '') {
                $http.get('http://localhost:1337/chat?sort=createdAt%20ASC&limit=100&where={"room":%20"' + $scope.chatRoom + '"}')
                    .success(function(success_data) {
                        $scope.chatList = success_data;
                        $timeout(function() {
                            var objDiv = document.getElementById("chatContainer");
                            objDiv.scrollTop = objDiv.scrollHeight;
                            $scope.chatMessage = "";
                        }, 200);
                    });
            } else {
                $http.get('http://localhost:1337/chat?sort=createdAt%20DESC&limit=100&where={"room":%20""}')
                    .success(function(success_data) {
                        $scope.chatList = success_data;
                        $timeout(function() {
                            var objDiv = document.getElementById("chatContainer");
                            objDiv.scrollTop = objDiv.scrollHeight;
                            $scope.chatMessage = "";
                        }, 200);
                    });
            }
        }

        fac.subscribe = function($scope) {
            io.socket.get('http://localhost:1337/chat/addconv?roomName="roomNameTest"');
            // get all existing date
            chatServiceLoad($scope);
            io.socket.on('chat', function(obj) {
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
                message: $scope.chatMessage,
                room: $scope.chatRoom,
                userId: $rootScope.userId
            });
            $timeout(function() {
                var objDiv = document.getElementById("chatContainer");
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 200);
            $scope.chatMessage = "";
        };
        return fac;
    });
