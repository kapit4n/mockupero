'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupNewCtrl
 * @description
 * # MockupNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupNewCtrl', ['$rootScope', '$scope', '$cookieStore' , '$window', '$location', '$routeParams', 'mockupService', 'projectService', 'breadcrumbService',
        function($rootScope, $scope, $cookieStore, $window, $location, $routeParams, mockupService, projectService, breadcrumbService) {
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
        projectService.projectById.get({projectId: $routeParams.projectId })
            .$promise.then(function(result) {
                $scope.project = result;
                try {
                    $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('mockup-new', $scope.project);
                    $rootScope.$digest();
                } catch(e) {}
            });

        $scope.cancel = function() {
            $window.location.href = '#/project/' + $routeParams.projectId;
        }
    }]);
