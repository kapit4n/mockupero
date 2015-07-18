'use strict';

/**
 * @ngdoc service
 * @name myYoProjectApp.myService
 * @description
 * # myService
 * Service in the myYoProjectApp.
 */
angular.module('myYoProjectApp')
    .service('projectService', function($resource) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};

        fac.projects = $resource('http://localhost:1337/project', {}, {
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

        return fac;
    });
