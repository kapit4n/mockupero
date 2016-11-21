'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.globalService
 * @description
 * # GlobalService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .factory('GlobalService', function($resource, $cookieStore) {
        var config = {};
        config.BASE_PATH = 'http://localhost:1337';
        config.settings = $resource(config.BASE_PATH + '/GlobalSettings/getByUserId', {
            userId: '@userId'
        }, {
            get: {
                method: 'GET'
            }
        });

        config.settingsSave = $resource(config.BASE_PATH + '/GlobalSettings/saveByUserId', {
            userId: '@userId',
            globalSettings: '@globalSettings'
        }, {
            save: {
                method: 'POST'
            }
        });

        config.settingsValue = {};
        config.reloadSettings = function() {
            config.settings.get({
                userId: $cookieStore.get('userId')
            }).$promise.then(function(result) {
                config.settingsValue = result;
            });
        };
        config.saveSettings = function() {
            config.settingsValue.userId = $cookieStore.get('userId');
            config.settingsSave.save({
                userId: $cookieStore.get('userId'),
                globalSettings: config.settingsValue
            }).$promise.then(function(result) {
                config.settingsValue = result;
            });
        }
        config.reloadSettings();
        return config;
    });
