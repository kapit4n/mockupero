'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupCtrl
 * @description
 * # MockupCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupCtrl', ['$scope', 'mockupService', '$routeParams', '$rootScope', function($scope, mockupService, $routeParams, $rootScope) {
        
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
                $scope.viewObject.editDesign = 'project/' + result.project.id + '/mockup-edit-design/' + result.id;
                $scope.viewObject.parentName = result.project.name;
                $scope.viewObject.parentUrl = '#/project/' + result.project.id;
            });
    }]);
