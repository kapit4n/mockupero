'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:reuseMockup
 * @description
 * # reuseMockup
 */
angular.module('mockuperApp')
    .directive('reuseMockup', ['mockupService', function(mockupService) {
        return {
            templateUrl: 'views/templates/reuse-mockup.html',
            restrict: 'E',
            scope: false,
            link: function postLink(scope, element, attrs) {
                scope.mockupsToReuse = [];
                scope.loadMockups = function() {
                    mockupService.getMockups.get({}).$promise.then(function(result) {
                        scope.mockupsToReuse = result;
                    }, function(err) {
                        $scope.err = err;
                    });
                };
                scope.useReference = function(mockup) {
                    var refItem = {};
                    refItem.top = 0;
                    refItem.left = 0;
                    refItem.position = 10;
                    refItem.src = 'http://localhost:1337/images/' + mockup.id + '.png';
                    refItem.type = 'reference';
                    refItem.width = mockup.width;
                    refItem.height = mockup.height;
                    refItem.id = 'new';
                    scope.mockupItems.push(refItem);
                };

                scope.copyItems = function(mockup) {}
                scope.loadMockups();
            }
        };
    }]);
