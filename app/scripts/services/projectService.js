'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.myService
 * @description
 * # myService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('projectService', function($resource) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};

        fac.projects = $resource('http://localhost:1337/project', {
            where: '@where',
            limit: '@limit'
        }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.projectById = $resource('http://localhost:1337/project/:projectId', {
            projectId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.deleteProject = $resource('http://localhost:1337/project/:id', {}, {
            get: {
                method: 'DELETE'
            }
        });

        fac.createProject = $resource('http://localhost:1337/project/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateProject = $resource('http://localhost:1337/project/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        fac.countProject = $resource('http://localhost:1337/project/count', {}, {
            get: {
                method: 'GET'
            }
        });

        return fac;
    });
