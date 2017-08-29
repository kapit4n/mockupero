'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockuppresentationCtrl
 * @description
 * # MockuppresentationCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockuppresentationCtrl', ['$scope', '$cookieStore', 'loginService', 'mockupService', 'breadcrumbService',
        '$routeParams', '$rootScope', 'headerService', 'permissionService', 'GlobalService',
        function($scope, $cookieStore, loginService, mockupService, breadcrumbService,
            $routeParams, $rootScope, headerService, permissionService, GlobalService) {
            $scope.mockupId = $routeParams.mockupId;
            $scope.globalService = GlobalService;
            loginService.reloadScope();
            headerService.updateHeader('projects');
            
            mockupService.mockupById.get({
                    mockupId: $routeParams.mockupId
                })
                .$promise.then(function(result) {
                    $scope.mockup = result;
                    try {
                        permissionService.loadPermission($scope, result.project.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('mockup', $scope.mockup);
                    } catch (e) { console.error(e); }
                }, function(error) {
                    console.error(error);
                });
            $scope.saveSuggest = function() {
                html2canvas($('#suggestMockup'), {
                    onrendered: function(canvas) {
                        var ctx = canvas.getContext('2d');
                        var dataURL = canvas.toDataURL();
                        mockupService.createMockupItemUploadAvatar.save({
                            img: dataURL,
                            mockupId: $routeParams.mockupId
                        }, function(result) {});

                    }
                });
            }
        }
    ]);
