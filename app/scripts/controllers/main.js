'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
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
        $scope.searchName = '';
        $rootScope.breadcrumb = mockupService.breadcrumb['home'];

        $scope.reloadProject = function() {
            projectService.projects.get({
                    where: {
                        name: {
                            "like": "%" + $scope.searchName + "%"
                        }
                    }
                })
                .$promise.then(function(result) {
                    console.log(result);
                    $scope.projects = result;
                });
        };

        $scope.reloadProject();

    }]);
