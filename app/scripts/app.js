'use strict';

/**
 * @ngdoc overview
 * @name mockuperApp
 * @description
 * # mockuperApp
 *
 * Main module of the application.
 */
angular
    .module('mockuperApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ng-context-menu'
    ])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/myroute', {
                templateUrl: 'views/myroute.html',
                controller: 'MyrouteCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/project/:projectId', {
                templateUrl: 'views/project.html',
                controller: 'ProjectCtrl'
            })
            .when('/mockup/:mockupId', {
                templateUrl: 'views/mockup.html',
                controller: 'MockupCtrl'
            })
            .when('/project/edit/:projectId', {
                templateUrl: 'views/project-edit.html',
                controller: 'ProjectEditCtrl'
            })
            .when('/project-new', {
                templateUrl: 'views/project-new.html',
                controller: 'ProjectNewCtrl'
            })
            .when('/project/:projectId/mockup-new', {
                templateUrl: 'views/mockup-new.html',
                controller: 'MockupNewCtrl'
            })
            .when('/mockup/edit/:mockupId', {
                templateUrl: 'views/mockup-edit.html',
                controller: 'MockupEditCtrl'
            })
            .when('/mockup-edit-design/:mockupId/suggest/:suggestId', {
                templateUrl: 'views/mockup-edit-design.html',
                controller: 'MockupEditDesignCtrl'
            })
            .when('/mockup-edit-design/:mockupId', {
                templateUrl: 'views/mockup-edit-design.html',
                controller: 'MockupEditDesignCtrl'
            })
            .when('/registerUser', {
                templateUrl: 'views/registeruser.html',
                controller: 'RegisteruserCtrl',
                controllerAs: 'registerUser'
            })
            .when('/userlist', {
                templateUrl: 'views/userlist.html',
                controller: 'UserlistCtrl',
                controllerAs: 'userlist'
            })
            .when('/projectlist', {
                templateUrl: 'views/projectlist.html',
                controller: 'ProjectlistCtrl',
                controllerAs: 'projectlist'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user.html',
                controller: 'UserCtrl',
                controllerAs: 'user'
            })
            .when('/user-edit/:userId', {
                templateUrl: 'views/user-edit.html',
                controller: 'UserEditCtrl',
                controllerAs: 'userEdit'
            })
            .when('/workflow/:workflowId', {
                templateUrl: 'views/workflow.html',
                controller: 'WorkflowCtrl',
                controllerAs: 'workflow'
            })
            .when('/workflowlist', {
                templateUrl: 'views/workflowlist.html',
                controller: 'WorkflowlistCtrl',
                controllerAs: 'workflowlist'
            })
            .when('/workflow-new', {
                templateUrl: 'views/workflow-new.html',
                controller: 'WorkflowNewCtrl',
                controllerAs: 'workflowNew'
            })
            .when('/workflow-edit/:workflowId', {
                templateUrl: 'views/workflow-edit.html',
                controller: 'WorkflowEditCtrl',
                controllerAs: 'workflowEdit'
            })
            .when('/project/:projectId/navigationDiagram', {
                templateUrl: 'views/navigationdiagram.html',
                controller: 'NavigationdiagramCtrl',
                controllerAs: 'navigationDiagram'
            })
            .when('/mockup-suggest/:mockupId', {
              templateUrl: 'views/mockuppresentation.html',
              controller: 'MockuppresentationCtrl',
              controllerAs: 'mockupPresentation'
            })
            .when('/presentation', {
              templateUrl: 'views/presentation.html',
              controller: 'PresentationCtrl',
              controllerAs: 'presentation'
            })
            .when('/permission-item-list', {
              templateUrl: 'views/permission-item-list.html',
              controller: 'PermissionItemListCtrl',
              controllerAs: 'permissionItemList'
            })
            .when('/permission-group-list', {
              templateUrl: 'views/permission-group-list.html',
              controller: 'PermissionGroupListCtrl',
              controllerAs: 'permissionGroupList'
            })
            .when('/permission-group/:permissionGroupId', {
              templateUrl: 'views/permission-group.html',
              controller: 'PermissionGroupCtrl',
              controllerAs: 'permissionGroup'
            })
            .when('/permission-group-new', {
              templateUrl: 'views/permission-group-new.html',
              controller: 'PermissionGroupNewCtrl',
              controllerAs: 'permissionGroupNew'
            })
            .when('/permission-group-edit/:permissionGroupId', {
              templateUrl: 'views/permission-group-edit.html',
              controller: 'PermissionGroupEditCtrl',
              controllerAs: 'permissionGroupEdit'
            })
            .when('/administration', {
              templateUrl: 'views/administration.html',
              controller: 'AdministrationCtrl',
              controllerAs: 'administration'
            })
            .when('/permission-item-edit/:permissionItemId', {
              templateUrl: 'views/permission-item-edit.html',
              controller: 'PermissionItemEditCtrl',
              controllerAs: 'permissionItemEdit'
            })
            .when('/permission-item-new', {
              templateUrl: 'views/permission-item-new.html',
              controller: 'PermissionItemNewCtrl',
              controllerAs: 'permissionItemNew'
            })
            .when('/permission-item/:permissionItemId', {
              templateUrl: 'views/permission-item.html',
              controller: 'PermissionItemCtrl',
              controllerAs: 'permissionItem'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
