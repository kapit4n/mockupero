'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.headerService
 * @description
 * # headerService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('headerService', function($rootScope) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};
        fac.updateHeader = function(current_active) {
            try {
                $rootScope.current_active = current_active;
                $rootScope.$digest();
            } catch (e) {}
        }
        return fac;
    });
