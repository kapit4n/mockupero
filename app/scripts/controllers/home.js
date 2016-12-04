'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('HomeCtrl', function($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
