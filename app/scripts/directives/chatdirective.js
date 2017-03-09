'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:chatDirective
 * @description
 * # chatDirective
 */
angular.module('mockuperApp')
    .directive('chatDirective', ['GlobalService', 'chatService', '$routeParams',
        function(GlobalService, chatService, $routeParams) {
            return {
                templateUrl: 'views/templates/chatDirective.html',
                restrict: 'E',
                scope: false,
                link: function postLink(scope, element, attrs) {
                    scope.globalService = GlobalService;
                    scope.chatList = [];
                    scope.chatMessage = '';
                    scope.chatRoom = $routeParams.mockupId ? $routeParams.mockupId : 'General';

                    scope.changeChat = function() {
                        GlobalService.settingsValue.chatCollapsed = !GlobalService.settingsValue.chatCollapsed;
                        GlobalService.saveSettings();
                    };

                    scope.sendMsgByInput = function(event, chatForm) {
                        if (!chatForm.chatMessage.$invalid && event.keyCode == 13) {
                            chatService.sendMsg(scope);
                        }
                    }

                    scope.sendMsg = function() {
                        chatService.sendMsg(scope);
                    }

                    chatService.subscribe(scope);
                }
            };
        }
    ]);
