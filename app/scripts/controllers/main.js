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
        $scope.currentPage = 1;
        $scope.pageSize = 2;
        $scope.projects = [];
        $scope.searchName = '';
        $scope.totalSize = 0;
        $rootScope.breadcrumb = mockupService.breadcrumb['home'];
        $scope.projectPages = [];

        $scope.makePagination = function() {
            $scope.projectPages = [];
            var isCurrentAux;
            var pageLabelText;
            var totalPages = parseInt($scope.totalSize / $scope.pageSize);
            if ((totalPages * $scope.pageSize) < $scope.totalSize) {
                totalPages += 1;
            }
            for (var i = 1; i <= totalPages; i++) {
                isCurrentAux = (i == $scope.currentPage);
                pageLabelText = i;
                if (i == 1) {
                    pageLabelText = 'First';
                } else if (i == totalPages) {
                    pageLabelText = 'Last';
                }
                var pageItem = {
                    isCurrent: isCurrentAux,
                    pageLabel: pageLabelText,
                    pageIndex: i
                };
                $scope.projectPages.push(pageItem);
            };
        };

        $scope.reloadProject = function(currentPage) {
            $scope.currentPage = currentPage;
            projectService.countProject.get({}).$promise.then(function(countResult) {
                $scope.totalSize = countResult.count;
                projectService.projects.get({
                        where: {
                            name: {
                                "like": "%" + $scope.searchName + "%"
                            }
                        },
                        limit: $scope.pageSize,
                        skip: (($scope.currentPage - 1) * $scope.pageSize)
                    })
                    .$promise.then(function(result) {
                        $scope.projects = result;
                        $scope.makePagination();
                    });
            });
        };
        $scope.reloadProject(1);
    }]);
