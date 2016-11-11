'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.mockupService
 * @description
 * # mockupService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('mockupVersionService', ['$resource', '$cookieStore', '$rootScope', '$routeParams',
        function($resource, $cookieStore, $rootScope, $routeParams) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var fac = {};

            fac.getMockupVersions = $resource('http://localhost:1337/mockupVersion', {}, {
                get: {
                    method: 'GET',
                    isArray: true
                }
            });

            fac.versionMockupById = $resource('http://localhost:1337/mockupVersion/:id', {
                id: '@id'
            }, {
                get: {
                    method: 'GET'
                }
            });

            fac.createMockupVersion = $resource('http://localhost:1337/mockupVersion/', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.updateMockupVersion = $resource('http://localhost:1337/mockupVersion/:id', {}, {
                update: {
                    method: 'PUT'
                }
            });

            fac.deleteMockupVersion = $resource('http://localhost:1337/mockupVersion/:id', {}, {
                delete: {
                    method: 'DELETE'
                }
            });

            fac.mockupVersionRestore = $resource('http://localhost:1337/mockupVersionRestore/', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.deleteMockupVersion = $resource('http://localhost:1337/deleteMockupVersion/', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.reloadMockupVersions = function($scope, mockupId) {
                console.log("This is the first example");
                fac.getMockupVersions.get({
                    where: {
                        mockup: $routeParams.mockupId
                    },
                    sort: 'createdAt DESC'
                }).$promise.then(function(result) {
                    $scope.versionMockups = result;
                    try {
                        console.log("This is the commit that I need to run after reload");
                        $scope.$digest();
                    } catch(ex) {}
                }, function(err) {
                    $scope.err = err;
                });
            };

            return fac;
        }
    ]);
