'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.chatService
 * @description
 * # chatService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('chatService', function($http, $rootScope, $timeout, $routeParams, GlobalService) {
        var fac = {};

        var chatServiceLoad = function($scope) {
            if ($scope.chatRoom != '') {
                $http.get(GlobalService.BASE_PATH + '/chat?sort=createdAt%20ASC&limit=100&where={"room":%20"' + $scope.chatRoom + '"}')
                    .then(function(success_data) {
                        $scope.chatList = success_data.data;
                        $timeout(function() {
                            var objDiv = document.getElementById("chatContainer");
                            objDiv.scrollTop = objDiv.scrollHeight;
                            $scope.chatMessage = "";
                        }, 200);
                    }, function(error){
                        console.error(error);
                    });
            } else {
                $http.get(GlobalService.BASE_PATH + '/chat?sort=createdAt%20DESC&limit=100&where={"room":%20""}')
                    .then(function(success_data) {
                        $scope.chatList = success_data.data;
                        $timeout(function() {
                            var objDiv = document.getElementById("chatContainer");
                            objDiv.scrollTop = objDiv.scrollHeight;
                            $scope.chatMessage = "";
                        }, 200);
                    }, function(error){
                        console.error(error);
                    });
            }
        }

        fac.subscribe = function($scope) {
            io.socket.get(GlobalService.BASE_PATH + '/chat/addconv?roomName="General"');
            // get all existing date
            chatServiceLoad($scope);
            io.socket.on('chat', function(obj) {
                if (obj.verb === 'created') {
                    $scope.chatList.push(obj.data);
                    $timeout(function() {
                        var objDiv = document.getElementById("chatContainer");
                        objDiv.scrollTop = objDiv.scrollHeight;
                    }, 200);
                    $scope.chatMessage = "";
                }
            });
        };

        fac.sendMsg = function($scope) {
            var chatRoom = 'General';
            if ($scope.chatRoom) {
                chatRoom = $scope.chatRoom;
            }
            io.socket.post(GlobalService.BASE_PATH + '/chat/addconv/', {
                user: $rootScope.userNameLogin,
                message: $scope.chatMessage,
                room: chatRoom,
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
