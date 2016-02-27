'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.breadcrumbService
 * @description
 * # breadcrumbService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('breadcrumbService', function ($rootScope) {
    var fac = {};
    /**
    * the param in the object that we want to manage
    */
    fac.updateBreadcrumb = function(type, param) {
      if (type == 'project-list') {
         var result =[{
                name: 'Home',
                url: ''
            }, {
                name: 'Projects',
                url: 'projectlist'
            }];
          return result;
      } else if (type == 'user-list') {
         var result =[{
                name: 'Home',
                url: ''
            }, {
                name: 'Users',
                url: 'userlist'
            }];
          return result;
      } else if (type == 'project-new') {
         var result =[{
                name: 'Home',
                url: '#/'
            }, {
                name: 'Projects',
                url: 'projectlist'
            }];
          return result;
      } else if (type == 'project') {
         var result =[{
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
      } else if (type == 'mockup-new') {
         var result =[{
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
      } else if (type == 'mockup') {
         var result =[{
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
                url: 'project/' + param.id + '/mockup/' + param.id
            }];
          return result;
      } else {
        var result =[{
                      name: 'Home',
                      url: '#/'
                    }];
        return result;
      }
    }
    return fac;
  });
