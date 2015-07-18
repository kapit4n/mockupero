'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
    .controller('MainCtrl', ['$scope', 'mockupService', 'projectService', '$location', '$rootScope', function($scope, mockupService, projectService, $location, $rootScope) {
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

        projectService.projects.get({})
            .$promise.then(function(result) {
                console.log(result);
                $scope.projects = result;
            });
    }]);
