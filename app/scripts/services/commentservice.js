'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.CommentService
 * @description
 * # CommentService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('commentService', function($resource) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};

        fac.getComments = $resource('http://localhost:1337/comment', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.commentById = $resource('http://localhost:1337/comment/:id', {
            id: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.createComment = $resource('http://localhost:1337/comment/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateComment = $resource('http://localhost:1337/comment/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        fac.deleteComment = $resource('http://localhost:1337/comment/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });

        return fac;
    });
