'use strict';

describe('Controller: UserEditCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var UserEditCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        UserEditCtrl = $controller('UserEditCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('User should be null if there is not any userId like param', function() {
        expect(scope.user).toBe(null);
    });
});
