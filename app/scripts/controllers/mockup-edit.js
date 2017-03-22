'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupEditCtrl
 * @description
 * # MockupEditCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupEditCtrl', ['$scope', 'loginService', '$location', '$routeParams', 'mockupService', 'commentService', 'breadcrumbService', 'headerService',
        function($scope, loginService, $location, $routeParams, mockupService, commentService, breadcrumbService, headerService) {

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
                        mockupService.publishUpdate($scope, result);
                        $location.path('/mockup/' + $scope.editObject.id);
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            }

            $scope.cancel = function() {
                $location.path('/mockup/' + $scope.editObject.id);
            }
        }
    ]);
