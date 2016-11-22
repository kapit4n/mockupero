'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:mockupVersion
 * @description
 * # mockupVersion
 */
angular.module('mockuperApp')
    .directive('mockupVersion', ['$cookieStore', '$timeout', 'mockupVersionService', '$routeParams',
        function($cookieStore, $timeout, mockupVersionService, $routeParams) {
            return {
                templateUrl: 'views/templates/mockupVersion.html',
                restrict: 'E',
                link: function postLink(scope, element, attrs) {
                    scope.newMockupVersion = function() {

                    };

                    scope.promoteMockupVersion = function() {

                    };

                    scope.reloadMockupVersions = function() {
                        mockupVersionService.getMockupVersions.get({
                            where: {
                                mockup: $routeParams.mockupId
                            },
                            sort: 'createdAt DESC'
                        }).$promise.then(function(result) {
                            scope.versionMockups = result;
                            try {
                                scope.$digest();
                            } catch (ex) {}
                        }, function(err) {
                            scope.err = err;
                        });
                    };

                    scope.deleteVersion = function(versionId) {

                        mockupVersionService.deleteMockupVersion.save({
                            mockupVersionId: versionId
                        }).$promise.then(function(result) {
                            $timeout(function() {
                                scope.reloadMockupVersions();
                            }, 2000);
                        }, function(reason) {
                            console.log(reason); // Error!
                        });
                    };

                    scope.restore = function(versionId) {
                        mockupVersionService.mockupVersionRestore.save({
                            mockupVersionId: versionId,
                            action: 'Restoring'
                        }).$promise.then(function(result) {
                            $timeout(function() {
                                scope.loadMockupItems();
                                scope.reloadMockupVersions();
                            }, 1000);
                        }, function(reason) {
                            console.log(reason); // Error!
                        });
                    };
                    scope.suggest = function(versionId) {
                        console.log("call the service to suggest");
                        console.log(versionId);
                    };
                }
            };
        }
    ]);
