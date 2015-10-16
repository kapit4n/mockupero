'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('UserlistCtrl', ['$scope', 'mockupService', 'projectService', 'userService', '$location',
        function($scope, mockupService, projectService, userService, $location) {
            $scope.users = [];
            userService.user.get({})
                .$promise.then(function(result) {
                    $scope.users = result;
                });
        }
    ]);