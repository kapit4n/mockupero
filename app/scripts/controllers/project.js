'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
    .controller('ProjectCtrl', ['$scope', 'mockupService', 'projectService', '$routeParams', '$location', '$rootScope',
        function($scope, mockupService, projectService, $routeParams, $location, $rootScope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            $scope.projectId = $routeParams.projectId;
            $scope.addMockup = function() {
                $location.path('/mockup-new');
            };

            $rootScope.breadcrumb = mockupService.breadcrumb['project'];

            $scope.workflows = [{
                name: 'start',
                functionName: '',
                className: 'btn-primary'
            }, {
                name: 'close',
                functionName: '',
                className: 'btn-success'
            }, {
                name: 'abandon',
                functionName: '',
                className: 'btn-danger'
            }];
            $scope.mockups = [{
                id: 0,
                name: 'Mockup 1',
                img: 'http://community.protoshare.com/wp-content/uploads/2010/12/example4-anim.gif',
                description: 'abandon'
            }, {
                id: 1,
                name: 'Mockup 2',
                img: 'http://cameronbarrett.com/images/lg_ia1.gif',
                description: 'abandon'
            }];
            $scope.project = null;
            projectService.projectById.get({
                    projectId: $routeParams.projectId
                })
                .$promise.then(function(result) {
                    $scope.project = result;
                });

        }
    ]);
