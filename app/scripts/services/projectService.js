'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.myService
 * @description
 * # myService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('projectService', function($resource, GlobalService) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};

        fac.projects = $resource(GlobalService.BASE_PATH + '/project', {
            where: '@where',
            limit: '@limit'
        }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.projectById = $resource(GlobalService.BASE_PATH + '/project/:projectId', {
            projectId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.deleteProject = $resource(GlobalService.BASE_PATH + '/project/:id', {}, {
            get: {
                method: 'DELETE'
            }
        });

        fac.createProject = $resource(GlobalService.BASE_PATH + '/project/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateProject = $resource(GlobalService.BASE_PATH + '/project/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        fac.countProject = $resource(GlobalService.BASE_PATH + '/project/count', {}, {
            get: {
                method: 'GET'
            }
        });

        fac.shareProject = $resource(GlobalService.BASE_PATH + '/projectShare', {}, {
            get: {
                method: 'POST'
            }
        });

        fac.getProjectUsers = $resource(GlobalService.BASE_PATH + '/projectShare', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.deleteProjectShare = $resource(GlobalService.BASE_PATH + '/projectShare/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });

        fac.projectTypes = ['Type 1', 'Type 2'];

        return fac;
    });
