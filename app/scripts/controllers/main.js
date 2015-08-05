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
        $scope.totalPages = 0;
        $rootScope.breadcrumb = mockupService.breadcrumb['home'];
        $scope.projectPages = [];

        $scope.sortAsc = true;

        $scope.makePagination = function() {
            $scope.projectPages = [];
            var isCurrentAux;
            var pageLabelText;


            for (var i = 1; i <= $scope.totalPages; i++) {
                isCurrentAux = (i == $scope.currentPage);
                pageLabelText = i;
                if (i == 1) {
                    pageLabelText = 'First';
                } else if (i == $scope.totalPages) {
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

        $scope.sortByName = function() {
            $scope.sortAsc = !$scope.sortAsc;
            $scope.reloadProject($scope.currentPage);
        };

        $scope.reloadProject = function(currentPage) {
            $scope.currentPage = currentPage;
            projectService.countProject.get({
                name: $scope.searchName
            }).$promise.then(function(countResult) {
                $scope.totalSize = countResult.count;

                $scope.totalPages = parseInt($scope.totalSize / $scope.pageSize);
                if (($scope.totalPages * $scope.pageSize) < $scope.totalSize) {
                    $scope.totalPages += 1;
                }

                if ($scope.totalPages < $scope.currentPage) {
                    $scope.currentPage -= 1;
                }
                var sortA = $scope.sortAsc ? 'ASC': 'DESC';
                projectService.projects.get({
                        where: {
                            name: {
                                "like": "%" + $scope.searchName + "%"
                            }
                        },
                        limit: $scope.pageSize,
                        skip: (($scope.currentPage - 1) * $scope.pageSize),
                        sort: 'name ' + sortA
                    })
                    .$promise.then(function(result) {
                        $scope.projects = result;
                        $scope.makePagination();
                    });
            });
        };

        $scope.deleteProject = function(projectId) {
            projectService.deleteProject.get({
                id: projectId
            }).$promise.then(function(result) {

                $scope.reloadProject($scope.currentPage);
            });
        }

        $scope.reloadProject(1);
    }]);
