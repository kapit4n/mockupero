'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.mockupService
 * @description
 * # mockupService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('mockupVersionService', ['$resource', '$cookieStore', '$routeParams', 'GlobalService',
        function($resource, $cookieStore, $routeParams, GlobalService) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var fac = {};

            fac.getMockupVersions = $resource(GlobalService.BASE_PATH + '/mockupVersion', {}, {
                get: {
                    method: 'GET',
                    isArray: true
                }
            });

            fac.versionMockupById = $resource(GlobalService.BASE_PATH + '/mockupVersion/:id', {
                id: '@id'
            }, {
                get: {
                    method: 'GET'
                }
            });

            fac.createMockupVersion = $resource(GlobalService.BASE_PATH + '/mockupVersion/', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.updateMockupVersion = $resource(GlobalService.BASE_PATH + '/mockupVersion/:id', {}, {
                update: {
                    method: 'PUT'
                }
            });

            fac.deleteMockupVersion = $resource(GlobalService.BASE_PATH + '/mockupVersion/:id', {}, {
                delete: {
                    method: 'DELETE'
                }
            });

            fac.mockupVersionRestore = $resource(GlobalService.BASE_PATH + '/mockupVersionRestore/', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.deleteMockupVersion = $resource(GlobalService.BASE_PATH + '/deleteMockupVersion/', {}, {
                save: {
                    method: 'POST'
                }
            });

            return fac;
        }
    ]);
