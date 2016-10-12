'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupNewCtrl
 * @description
 * # MockupNewCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupNewCtrl', ['$rootScope', '$scope', '$cookieStore' , '$window', '$location', '$routeParams', 'mockupService', 'projectService', 'breadcrumbService', 'headerService',
        function($rootScope, $scope, $cookieStore, $window, $location, $routeParams, mockupService, projectService, breadcrumbService, headerService) {
        headerService.updateHeader('projects');
        $scope.name = '';
        $scope.objType = 'Mockup';
        $scope.objName = '';
        $scope.description = '';
        $scope.imgToShow = '';
        $scope.project = {};
        $scope.project.id = $routeParams.projectId;

        $scope.save = function(addObjectForm) {
          if (addObjectForm.$valid) {
            mockupService.createMockup.save({
              name: $scope.objName,
              description: $scope.description,
              imgToShow: $scope.imgToShow,
              project: $scope.project,
              userId: $cookieStore.get('userId')
            }, function (result) {
              $window.location.href = '#/project/' + $routeParams + '/mockup/' + result.id;
            }, function (err) {
              $scope.err = err;
            });
          }
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
