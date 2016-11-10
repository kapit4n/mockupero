'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:mockupVersion
 * @description
 * # mockupVersion
 */
angular.module('mockuperApp')
    .directive('mockupVersion', ['$cookieStore', 'mockupVersionService',
        function($cookieStore, mockupVersionService) {
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

                    scope.restore = function(versionId) {
                        mockupVersionService.mockupVersionRestore.save({
                            mockupVersionId: versionId,
                            action: 'Restoring'
                        }).$promise.then(function(result) {
                            console.log(result);
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
