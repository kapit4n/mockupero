'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.notificationService
 * @description
 * # notificationService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('notificationService', function($resource, GlobalService) {

        var fac = {};

        fac.sendMail = $resource(GlobalService.BASE_PATH + '/SendEmail/mail', {
            to: '@to',
            subject: '@subject',
            text: '@text',
        }, {
            get: {
                method: 'GET'
            }
        });

        return fac;

    });
