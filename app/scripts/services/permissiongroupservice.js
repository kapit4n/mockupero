'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.permissionGroupService
 * @description
 * # permissionGroupService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('permissionGroupService', function($resource, GlobalService) {
        var fac = {};
        fac.permissionGroup = $resource(GlobalService.BASE_PATH + '/permissionGroup', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.createPermissionGroup = $resource(GlobalService.BASE_PATH + '/permissionGroup/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updatePermissionGroup = $resource(GlobalService.BASE_PATH + '/permissionGroup/:id', {}, {
            save: {
                method: 'PUT'
            }
        });

        fac.permissionGroupById = $resource(GlobalService.BASE_PATH + '/permissionGroup/:permissionGroupId', {
            permissionGroupId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.deletePermissionGroup = $resource(GlobalService.BASE_PATH + '/permissionGroup/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });
        return fac;
    });
