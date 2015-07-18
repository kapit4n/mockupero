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
        $rootScope.breadcrumb = mockupService.breadcrumb['mockup'];
        $scope.mockup = null;
        mockupService.mockupById.get({
                mockupId: $routeParams.mockupId
            })
            .$promise.then(function(result) {
                console.log(result);
                $scope.mockup = result;
                $scope.viewObject = result;
                $scope.viewObject.title = 'Mockup View';
                $scope.viewObject.editUrl = 'project/' + result.project.id + '/mockup/edit/' + result.id;
            });
    }]);
