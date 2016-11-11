'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:mockupVersion
 * @description
 * # mockupVersion
 */
angular.module('mockuperApp')
    .directive('mockupVersion', ['$cookieStore', '$timeout', 'mockupVersionService',
        function($cookieStore, $timeout, mockupVersionService) {
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

                    scope.deleteVersion = function(versionId) {
                        mockupVersionService.deleteMockupVersion.save({
                            mockupVersionId: versionId
                        }).$promise.then(function(result) {
                            $timeout(function() {
                                scope.reloadMockupVersion();
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
                                scope.reloadMockupVersion();
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
