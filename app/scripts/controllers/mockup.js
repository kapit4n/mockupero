'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MockupCtrl
 * @description
 * # MockupCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
    .controller('MockupCtrl', ['$scope', 'mockupService', '$routeParams', '$rootScope', function($scope, mockupService, $routeParams, $rootScope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.mockupList = mockupService.mockups;

        $scope.mockupId = $routeParams.mockupId % $scope.mockupList.length;
        $scope.projectId = $routeParams.projectId;
        $scope.mockup = $scope.mockupList[$scope.mockupId];

        $rootScope.breadcrumb = mockupService.breadcrumb['mockup'];
    }]);
