'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MockupCtrl
 * @description
 * # MockupCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
    .controller('MockupCtrl', ['$scope', 'mockupService', '$routeParams', function($scope, mockupService, $routeParams) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.mockupList = mockupService.mockupService;

        $scope.mockupId = $routeParams.mockupId % $scope.mockupList.length;
        $scope.projectId = $routeParams.projectId;
        $scope.mockup = $scope.mockupList[$scope.mockupId];
    }]);
