'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.mockupService
 * @description
 * # mockupService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('mockupVersionService', ['$resource', '$cookieStore', '$routeParams',
        function($resource, $cookieStore, $routeParams) {
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

            return fac;
        }
    ]);
