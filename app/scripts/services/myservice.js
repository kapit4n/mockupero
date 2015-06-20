'use strict';

/**
 * @ngdoc service
 * @name myYoProjectApp.myService
 * @description
 * # myService
 * Service in the myYoProjectApp.
 */
angular.module('myYoProjectApp')
    .service('mockupService', function() {
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
            className : 'btn-primary'
        }, {
            name: 'close',
            functionName: '',
            className : 'btn-success'
        }, {
            name: 'abandon',
            functionName: '',
            className : 'btn-danger'
        }];

        fac.projects = ['John', 'James', 'Jake'];

        return fac;
    });
