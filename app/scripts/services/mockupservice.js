'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.mockupService
 * @description
 * # mockupService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('mockupService', function($resource) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};

        fac.mockups = [{
            id: 0,
            name: 'Mockup 1',
            mockupImg: 'http://community.protoshare.com/wp-content/uploads/2010/12/example4-anim.gif',
            description: 'abandon'
        }, {
            id: 1,
            name: 'Mockup 2',
            mockupImg: 'http://cameronbarrett.com/images/lg_ia1.gif',
            description: 'abandon'
        }];

        fac.workflows = [{
            name: 'start',
            functionName: '',
            className: 'btn-primary'
        }, {
            name: 'close',
            functionName: '',
            className: 'btn-success'
        }, {
            name: 'abandon',
            functionName: '',
            className: 'btn-danger'
        }];

        fac.breadcrumb = {
            home: [{
                name: 'Home',
                url: '/'
            }],
            project: [{
                name: 'Home',
                url: '/'
            }, {
                name: 'Project',
                url: '/project'
            }],
            mockup: [{
                name: 'Home',
                url: '/'
            }, {
                name: 'Project',
                url: '/project'
            }, {
                name: 'Mockup',
                url: '/project/1/mockup'
            }]
        };

        fac.projects = ['John', 'James', 'Jake'];

        fac.mockupById = $resource('http://localhost:1337/mockup/:mockupId', {
            mockupId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.createMockup = $resource('http://localhost:1337/mockup/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.createMockupItem = $resource('http://localhost:1337/mockupItem/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.createMockupItemUploadAvatar = $resource('http://localhost:1337/mockupItem/uploadAvatar', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateMockupItem = $resource('http://localhost:1337/mockupItem/:id', {}, {
            save: {
                method: 'PUT'
            }
        });

        fac.updateMockup = $resource('http://localhost:1337/mockup/:id', {}, {
            update: {
                method: 'PUT'
            }
        });


        fac.getMockupItems = $resource('http://localhost:1337/mockupItem', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

       

        return fac;
    });
