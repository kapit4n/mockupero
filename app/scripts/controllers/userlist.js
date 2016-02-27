'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('UserlistCtrl', ['$scope', 'loginService', 'mockupService', 'projectService', 'userService', '$location', 'headerService',
        function($scope, loginService, mockupService, projectService, userService, $location, headerService) {

            loginService.reloadScope();
            headerService.updateHeader('users');
            $scope.users = [];
            userService.user.get({})
                .$promise.then(function(result) {
                    $scope.users = result;
                });

            $scope.addUser = function() {
                $location.path('/registerUser');
            }
        }
    ]);