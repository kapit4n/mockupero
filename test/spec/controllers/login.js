'use strict';

describe('Controller: LoginCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var LoginCtrl,
        scope, $location, loginService, $cookieStore, $timeout, $rootScope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, _$rootScope_, _$location_, _loginService_, _$cookieStore_, _$timeout_) {
        scope = _$rootScope_.$new();
        $location = _$location_;
        loginService = _loginService_;
        $cookieStore = _$cookieStore_;
        $timeout = _$timeout_;
        $rootScope = _$rootScope_

        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope,
            $location: _$location_,
            $rootScope: _$rootScope_
                // place here mocked dependencies
        });
    }));

    it('Initial values', function() {
        console.log(scope);
        scope.userName = "admin";
        scope.password = "admin";

        $timeout(function assert() {
            scope.singIn();

            expect($rootScope.isAuthenticated).toBe(true);
            expect($rootScope.userNameLogin).toBe("adminx");
            expect($cookieStore.userId).toBeUndefined();
            expect($cookieStore.username).toBeUndefined();
            expect($cookieStore.username).toBe($rootScope.userNameLogin);
            expect(scope.userName).toBe('admin');

            $timeout.verifyNoPendingTasks();
            done();
        }, 3000);

    });
});
