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
            .when('/project/:projectId/mockup/:mockupId', {
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
            .when('/project/:projectId/mockup/edit/:mockupId', {
                templateUrl: 'views/mockup-edit.html',
                controller: 'MockupEditCtrl'
            })
            .when('/project/:projectId/mockup-edit-design/:mockupId', {
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
            .when('/workflow', {
                templateUrl: 'views/workflow.html',
                controller: 'WorkflowCtrl',
                controllerAs: 'workflow'
            })
            .when('/workflowList', {
                templateUrl: 'views/workflowlist.html',
                controller: 'WorkflowlistCtrl',
                controllerAs: 'workflowList'
            })
            .when('/workflow-new', {
                templateUrl: 'views/workflow-new.html',
                controller: 'WorkflowNewCtrl',
                controllerAs: 'workflowNew'
            })
            .when('/workflow-edit', {
                templateUrl: 'views/workflow-edit.html',
                controller: 'WorkflowEditCtrl',
                controllerAs: 'workflowEdit'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
