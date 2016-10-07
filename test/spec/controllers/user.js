'use strict';

describe('Controller: UserCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var UserCtrl,
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
        UserCtrl = $controller('UserCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('User should be null if there is not any userId like param', function() {
        expect(scope.user).toBe(null);
        expect(scope.editMode).toBe(true);
        expect(rootScope.breadcrumb[0]['Home']).toBe(result[0]['Home']);
        expect(rootScope.breadcrumb[0]['Users']).toBe(result[0]['Users']);
    });
});
