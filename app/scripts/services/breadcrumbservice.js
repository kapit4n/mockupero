'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.breadcrumbService
 * @description
 * # breadcrumbService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('breadcrumbService', function($rootScope) {
        var fac = {};
        /**
         * the param in the object that we want to manage
         */
        fac.updateBreadcrumb = function(type, param) {
            switch (type) {
                case 'permission-group-list':
                    var result = [{
                        name: 'Home',
                        url: ''
                    }, {
                        name: 'admin',
                        url: 'administration'
                    }, {
                        name: 'Permission Groups',
                        url: 'permission-group-list'
                    }];
                    return result;
                    break;
                case 'permission-group-new':
                    var result = [{
                        name: 'Home',
                        url: '#/'
                    }, {
                        name: 'admin',
                        url: 'administration'
                    }, {
                        name: 'Permission Groups',
                        url: 'permission-group-list'
                    }];
                    return result;
                    break;
                case 'workflow-list':
                    var result = [{
                        name: 'Home',
                        url: ''
                    }, {
                        name: 'admin',
                        url: 'administration'
                    }, {
                        name: 'Workflows',
                        url: 'workflowlist'
                    }];
                    return result;
                    break;
                case 'workflow-new':
                    var result = [{
                        name: 'Home',
                        url: '#/'
                    }, {
                        name: 'admin',
                        url: 'administration'
                    }, {
                        name: 'Workflows',
                        url: 'workflowlist'
                    }];
                    return result;
                    break;
                case 'project-list':
                    var result = [{
                        name: 'Home',
                        url: ''
                    }, {
                        name: 'Projects',
                        url: 'projectlist'
                    }];
                    return result;
                    break;
                case 'user-list':
                    var result = [{
                        name: 'Home',
                        url: ''
                    }];
                    return result;
                    break;
                case 'user':
                    var result = [{
                        name: 'Home',
                        url: ''
                    }, {
                        name: 'Users',
                        url: 'userlist'
                    }];
                    return result;
                    break;
                case 'project-new':
                    var result = [{
                        name: 'Home',
                        url: '#/'
                    }, {
                        name: 'Projects',
                        url: 'projectlist'
                    }];
                    return result;
                    break;
                case 'project':
                    var result = [{
                        name: 'Home',
                        url: '#/'
                    }, {
                        name: 'Projects',
                        url: 'projectlist'
                    }, {
                        name: '' + (param.name.length > 20 ? param.name.substr(0, 20 - 1) + '...' : param.name),
                        url: 'project/' + param.id
                    }];
                    return result;
                    break;
                case 'workflow':
                    var result = [{
                        name: 'Home',
                        url: '#/'
                    }, {
                        name: 'admin',
                        url: 'administration'
                    }, {
                        name: 'Workflows',
                        url: 'workflowlist'
                    }, {
                        name: '' + (param.name.length > 20 ? param.name.substr(0, 20 - 1) + '...' : param.name),
                        url: 'workflow/' + param.id
                    }];
                    return result;
                    break;
                case 'permission-group':
                    var result = [{
                        name: 'Home',
                        url: '#/'
                    }, {
                        name: 'admin',
                        url: 'administration'
                    }, {
                        name: 'Permission Groups',
                        url: 'permission-group-list'
                    }, {
                        name: '' + (param.name.length > 20 ? param.name.substr(0, 20 - 1) + '...' : param.name),
                        url: 'permission-group/' + param.id
                    }];
                    return result;
                    break;
                case 'mockup-new':
                    var result = [{
                        name: 'Home',
                        url: '#/'
                    }, {
                        name: 'Projects',
                        url: 'projectlist'
                    }, {
                        name: '' + (param.name.length > 20 ? param.name.substr(0, 20 - 1) + '...' : param.name),
                        url: 'project/' + param.id
                    }];
                    return result;
                    break;
                case 'mockup':
                    var result = [{
                        name: 'Home',
                        url: 'projectlist'
                    }, {
                        name: 'Projects',
                        url: ''
                    }, {
                        name: '' + (param.project.name.length > 20 ? param.project.name.substr(0, 20 - 1) + '...' : param.project.name),
                        url: 'project/' + param.project.id
                    }, {
                        name: '' + (param.name.length > 20 ? param.name.substr(0, 20 - 1) + '...' : param.name),
                        url: 'mockup/' + param.id
                    }];
                    return result;
                    break;
                default:
                    var result = [{
                        name: 'Home',
                        url: '#/'
                    }];
                    return result;
                    break;
            }

        }

        return fac;
    });
