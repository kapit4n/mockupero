'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupNewCtrl
 * @description
 * # MockupNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupNewCtrl', ['$scope', '$window', '$location', '$routeParams', 'mockupService', function($scope, $window, $location, $routeParams, mockupService) {

        $scope.name = 'Mockup Name Scope';
        $scope.description = 'Mockup Description Scope';
        $scope.imgToShow = 'http://codeconvey.com/wp-content/uploads/2014/02/HTML-Login-form.png';
        $scope.project = {};
        $scope.project.id = $routeParams.projectId;
        $scope.save = function() {
            mockupService.createMockup.save({
                name: $scope.name,
                description: $scope.description,
                imgToShow: $scope.imgToShow,
                project: $scope.project
            }, function(result) {
                $window.location.href = '#/project/' + $routeParams + '/mockup/' + result.id;
            });
        };

        $scope.cancel = function() {
            $window.location.href = '#/project/' + $routeParams.projectId + '/mockup/' + $scope.editObject.id;
        }
    }]);
