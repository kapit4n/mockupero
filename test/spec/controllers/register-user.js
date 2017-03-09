'use strict';

describe('Controller: RegisteruserCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var RegisteruserCtrl,
        scope, rootScope;
    var result = [{
        name: 'Home',
        url: ''
    }, {
        name: 'Users',
        url: 'userlist'
    }];

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        RegisteruserCtrl = $controller('RegisteruserCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('Initial values', function() {
        expect(scope.username).toBe('');
        expect(scope.email).toBe('');
        expect(scope.password).toBe('');
        expect(scope.password_confirm).toBe('');
        expect(rootScope.breadcrumb[0]['Home']).toBe(result[0]['Home']);
        expect(rootScope.breadcrumb[0]['Users']).toBe(result[0]['Users']);
    });
});
