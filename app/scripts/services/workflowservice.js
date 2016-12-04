'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.workflowService
 * @description
 * # workflowService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('workflowService', function($resource, GlobalService) {
        var fac = {};
        fac.workflow = $resource(GlobalService.BASE_PATH + '/workflow', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.createWorkflow = $resource(GlobalService.BASE_PATH + '/workflow/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateWorkflow = $resource(GlobalService.BASE_PATH + '/workflow/:id', {}, {
            save: {
                method: 'PUT'
            }
        });

        fac.workflowById = $resource(GlobalService.BASE_PATH + '/workflow/:workflowId', {
            workflowId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.deleteWorkflow = $resource(GlobalService.BASE_PATH + '/workflow/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });
        return fac;
    });
