'use strict';

describe('Controller: MockupEditCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var MockupEditCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MockupEditCtrl = $controller('MockupEditCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(scope.editObject).toBe(null);
    });
});
