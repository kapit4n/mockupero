'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.notificationService
 * @description
 * # notificationService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('notificationService', function ($resource) {
    
    	var fac = {};

        fac.sendMail = $resource('http://localhost:1337/SendEmail/mail', {
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
