'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.userService
 * @description
 * # userService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('userService', function($resource, GlobalService) {
        var fac = {};
        fac.user = $resource(GlobalService.BASE_PATH + '/user', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.projectPermission = $resource(GlobalService.BASE_PATH + '/project/projectPermission', {}, {
            get: {
                method: 'GET'
            }
        });

        fac.permission = $resource(GlobalService.BASE_PATH + '/permission', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.createUser = $resource(GlobalService.BASE_PATH + '/user/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateUser = $resource(GlobalService.BASE_PATH + '/user/:id', {}, {
            save: {
                method: 'PUT'
            }
        });

        fac.userById = $resource(GlobalService.BASE_PATH + '/user/:userId', {
            userId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.deleteUser = $resource(GlobalService.BASE_PATH + '/user/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });
        return fac;
    });
