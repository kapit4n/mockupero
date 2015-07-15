'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
    .controller('MainCtrl', ['$scope', 'mockupService', '$location', '$rootScope', function($scope, mockupService, $location, $rootScope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            $scope.addProject = function() {
                $location.path('/project-new');
            };
            $scope.projects = [];
            $rootScope.breadcrumb = mockupService.breadcrumb['home'];

            mockupService.project1.get({
                    userId: 123
                })
                .$promise.then(function(projects) {
                        $scope.projects = projects;
                });


    }]);
