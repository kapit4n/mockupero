'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.globalService
 * @description
 * # GlobalService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .factory('GlobalService', function() {
        var config = {};
        config.BASE_PATH = 'http://localhost:1337';
        return config;
    });
