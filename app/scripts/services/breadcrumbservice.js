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
      if (type == 'project') {
         var result =[{
                name: 'Home',
                url: '#/'
            }, {
                name: 'Projects',
                url: ''
            }, {
                name: '' + (param.name.length > 20 ? param.name.substr(0, 20 - 1) + '...' : param.name),
                url: 'project/' + param.id
            }];
          return result;
      } if (type == 'mockup') {
         var result =[{
                name: 'Home',
                url: '#/'
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
