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
        $rootScope.breadcrumb_url = "<a href='/'>Home</a>/<a href='/" + param.id + "'>" + param.name + "</a> ";
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
