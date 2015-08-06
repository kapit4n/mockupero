'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupEditDesignCtrl
 * @description
 * # MockupEditDesignCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
  .controller('MockupEditDesignCtrl', ['$scope', '$window', '$routeParams', 'mockupService', function($scope, $window, $routeParams, mockupService) {

        $scope.editObject = null;

        mockupService.mockupById.get({
                mockupId: $routeParams.mockupId
            })
            .$promise.then(function(result) {
                console.log(result);
                $scope.editObject = result;
            });

        $scope.save = function() {
            mockupService.updateMockup.update({
                id: $scope.editObject.id
            }, $scope.editObject, function(result) {
                console.log(result);
                $window.location.href = '#/project/' + $routeParams.projectId + '/mockup/' + $scope.editObject.id;
            });
        }

        $scope.cancel = function() {
            $window.location.href = '#/project/' + $routeParams.projectId + '/mockup/' + $scope.editObject.id;
        }
    }]);

