'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.permissionService
 * @description
 * # permissionService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
  .service('permissionService', function ($rootScope, userService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var fac = {};
    fac.loadPermission = function (scope, projectId, userId) {
        try {
            userService.projectPermission.get(
                {
                    projectId: projectId,
                    userId: userId
                }).$promise.then(function(result) {
                    try {
                        if (result.permission[0].can == 'edit') {
                            scope.editMode = true;
                            if (scope.editMode) {
                                scope.itemStyle = 'resize-drag';
                            } else {
                                scope.itemStyle = '';
                            }
                        } else {
                            scope.editMode = false;
                            if (scope.editMode) {
                                scope.itemStyle = 'resize-drag';
                            } else {
                                scope.itemStyle = '';
                            }
                        }
                        //$rootScope.$digest();
                    } catch(e1) {console.error(e1);}
                });
        } catch(e) { console.error(e);}
    };
    return fac;
  });
