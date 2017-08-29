'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:reuseMockup
 * @description
 * # reuseMockup
 */
angular.module('mockuperApp')
    .directive('reuseMockup', ['mockupService', '$http', 'GlobalService', function(mockupService, $http, GlobalService) {
        return {
            templateUrl: 'views/templates/reuse-mockup.html',
            restrict: 'E',
            scope: false,
            link: function postLink(scope, element, attrs) {
                scope.mockupsToReuse = [];
                scope.globalService = GlobalService;
                scope.loadMockups = function() {
                    mockupService.getMockups.get({}).$promise.then(function(result) {
                        scope.mockupsToReuse = result;
                    }, function(err) {
                        $scope.err = err;
                    });
                };
                scope.useReference = function(mockup) {
                    $http.get(GlobalService.BASE_PATH + '/images/' + mockup.id + '.png', { responseType: "arraybuffer" }).success(function(data) {
                        var arrayBufferView = new Uint8Array(data);
                        var blob = new Blob([arrayBufferView], { type: "image/png" });
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL(blob);
                        var refItem = {};
                        refItem.top = 0;
                        refItem.left = 0;
                        refItem.position = 10;
                        //refItem.src = imageUrl;
                        refItem.src = GlobalService.BASE_PATH + '/images/' + mockup.id + '.png';
                        refItem.type = 'reference';
                        refItem.width = mockup.width;
                        refItem.height = mockup.height;
                        refItem.id = 'new';
                        scope.mockupItems.push(refItem);
                        // code to download image here
                    }).error(function(err, status) {})


                };

                scope.copyItems = function(mockup) {}
                scope.loadMockups();
            }
        };
    }]);
