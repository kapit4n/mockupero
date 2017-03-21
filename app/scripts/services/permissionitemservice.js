'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.permissionItemService
 * @description
 * # permissionItemService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('permissionItemService', function($resource, GlobalService) {
        var fac = {};
        fac.permissionItem = $resource(GlobalService.BASE_PATH + '/permissionItem', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.createPermissionItem = $resource(GlobalService.BASE_PATH + '/permissionItem/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updatePermissionItem = $resource(GlobalService.BASE_PATH + '/permissionItem/:id', {}, {
            save: {
                method: 'PUT'
            }
        });

        fac.permissionItemById = $resource(GlobalService.BASE_PATH + '/permissionItem/:permissionItemId', {
            permissionItemId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.deletePermissionItem = $resource(GlobalService.BASE_PATH + '/permissionItem/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });
        return fac;
    });
