'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupEditCtrl
 * @description
 * # MockupEditCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupEditCtrl', ['$scope', 'loginService', '$window', '$routeParams', 'mockupService', 'breadcrumbService', 'headerService',
        function($scope, loginService, $window, $routeParams, mockupService, breadcrumbService, headerService) {

            $scope.editObject = null;
            loginService.reloadScope();
            headerService.updateHeader('projects');
            mockupService.mockupById.get({
                    mockupId: $routeParams.mockupId
                })
                .$promise.then(function(result) {
                    $scope.editObject = result;
                    try {
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('mockup', $scope.editObject);
                        $rootScope.$digest();
                    } catch (e) {}
                });

            $scope.save = function(editMockupForm) {
                if (editMockupForm.$valid) {
                    mockupService.updateMockup.update({
                        id: $scope.editObject.id
                    }, $scope.editObject, function(result) {
                        $window.location.href = '#/project/' + $routeParams.projectId + '/mockup/' + $scope.editObject.id;
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            }

            $scope.cancel = function() {
                $window.location.href = '#/project/' + $routeParams.projectId + '/mockup/' + $scope.editObject.id;
            }
        }
    ]);
