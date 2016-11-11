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
                    scope.reloadMockupVersion = function() {

                    };

                    scope.newMockupVersion = function() {

                    };

                    scope.promoteMockupVersion = function() {

                    };

                    scope.reloadMockupVersions = function(mockupId) {
                        console.log("This is the first example");
                        mockupVersionService.getMockupVersions.get({
                            where: {
                                mockup: $routeParams.mockupId
                            },
                            sort: 'createdAt DESC'
                        }).$promise.then(function(result) {
                            scope.versionMockups = result;
                            try {
                                console.log("This is the commit that I need to run after reload");
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
                                console.log("This is the delete timeout");
                                console.log();
                                scope.reloadMockupVersion();
                                console.log("this is 2");
                            }, 2000);
                            try {
                                console.log("This is the deletVersion");
                                scope.$digest();
                            } catch (ex) { console.log(ex); }
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
                                console.log("This is the restore timeout");
                                scope.loadMockupItems();
                                scope.reloadMockupVersion();
                                try {
                                    scope.$digest();
                                } catch (ex) { console.log(ex); }
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
