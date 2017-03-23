'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.mockupService
 * @description
 * # mockupService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('mockupService', function($resource, GlobalService, commentService) {
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
                url: '/mockup'
            }]
        };

        fac.projects = ['John', 'James', 'Jake'];

        fac.mockupById = $resource(GlobalService.BASE_PATH + '/mockup/:mockupId', {
            mockupId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });


        fac.getMockups = $resource(GlobalService.BASE_PATH + '/mockup', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.createMockup = $resource(GlobalService.BASE_PATH + '/mockup/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.createMockupItem = $resource(GlobalService.BASE_PATH + '/mockupItem/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.deleteMockup = $resource(GlobalService.BASE_PATH + '/mockup/:id', {}, {
            get: {
                method: 'DELETE'
            }
        });

        fac.deleteMockupItem = $resource(GlobalService.BASE_PATH + '/mockupItem/:id', {}, {
            deleteIt: {
                method: 'DELETE'
            }
        });

        fac.createMockupItemUploadAvatar = $resource(GlobalService.BASE_PATH + '/mockupItem/uploadAvatar', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateMockupItem = $resource(GlobalService.BASE_PATH + '/mockupItem/:id', {}, {
            save: {
                method: 'PUT'
            }
        });

        fac.updateMockup = $resource(GlobalService.BASE_PATH + '/mockup/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        fac.getMockupItems = $resource(GlobalService.BASE_PATH + '/mockupItem', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.saveAllMockupItems = $resource(GlobalService.BASE_PATH + '/mockupItem/saveAll', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.publishCreate = function($scope, mockup) {
            $scope.newComment = "Mockup " + mockup.name + " has been Created";
            $scope.relationName = mockup.name;
            $scope.relationId = mockup.id;
            $scope.relationType = 'mockup';
            commentService.share($scope);
        };

        fac.publishUpdate = function($scope, mockup) {
            $scope.newComment = "Mockup " + mockup.name + " has been Updated";
            $scope.relationName = mockup.name;
            $scope.relationId = mockup.id;
            $scope.relationType = 'mockup';
            commentService.share($scope);
        };

        fac.publishSuggestUpdate = function($scope, mockup) {
            $scope.newComment = "Mockup suggest has been Updated for mockup (" + mockup.name + ")";
            $scope.isMockupSuggest = true;
            $scope.relationName = mockup.name;
            $scope.relationId = mockup.mockupParent;
            $scope.relationType = 'mockup';
            $scope.mockupSuggestId = mockup.id;
            commentService.share($scope);
        };

        fac.publishSuggestCreate = function($scope, mockup) {
            $scope.newComment = "Mockup suggest has been created for mockup (" + mockup.name + ")";
            $scope.isMockupSuggest = true;
            $scope.relationName = mockup.name;
            $scope.relationId = mockup.mockupParent;
            $scope.relationType = 'mockup';
            $scope.mockupSuggestId = mockup.id;
            commentService.share($scope);
        };

        return fac;
    });
