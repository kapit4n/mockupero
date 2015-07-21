'use strict';

/**
 * @ngdoc function
 * @name moCkUperapp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('ProjectCtrl', ['$scope', 'mockupService', 'projectService', '$routeParams', '$location', '$rootScope',
        function($scope, mockupService, projectService, $routeParams, $location, $rootScope) {
            $scope.projectId = $routeParams.projectId;
            $scope.addMockup = function() {
                $location.path('/project/' + $scope.projectId + '/mockup-new');
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
            $scope.viewObject = null;
            projectService.projectById.get({
                    projectId: $routeParams.projectId
                })
                .$promise.then(function(result) {
                    console.log(result);
                    $scope.viewObject = result;
                    $scope.project = result;
                    $scope.viewObject.title = 'Project View';
                    $scope.viewObject.editUrl = 'project/edit/' + result.id;
                });
        }
    ]);
