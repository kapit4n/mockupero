'use strict';

describe('Controller: MockupCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var MockupCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MockupCtrl = $controller('MockupCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('Initial values', function() {
        expect(scope.mockup).toBe(null);
        expect(typeof scope.logingLog).toBe('object');
        expect(angular.isArray(scope.mockupList)).toBe(true);
    });
});
