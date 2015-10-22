'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupNewCtrl
 * @description
 * # MockupNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupNewCtrl', ['$scope', '$cookieStore' , '$window', '$location', '$routeParams', 'mockupService',
        function($scope, $cookieStore, $window, $location, $routeParams, mockupService) {

        $scope.name = '';
        $scope.objName = 'Mockup';
        $scope.description = '';
        $scope.imgToShow = '';
        $scope.project = {};
        $scope.project.id = $routeParams.projectId;
        $scope.save = function() {
            mockupService.createMockup.save({
                name: $scope.name,
                description: $scope.description,
                imgToShow: $scope.imgToShow,
                project: $scope.project,
                userId: $cookieStore.get('userId')
            }, function(result) {
                $window.location.href = '#/project/' + $routeParams + '/mockup/' + result.id;
            });
        };

        $scope.cancel = function() {
            $window.location.href = '#/project/' + $routeParams.projectId + '/mockup/' + $scope.editObject.id;
        }
    }]);
