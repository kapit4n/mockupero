'use strict';

describe('Controller: ProjectCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var ProjectCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ProjectCtrl = $controller('ProjectCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('Initial values', function() {
        expect(scope.projectId).toBe(undefined);
        expect(typeof scope.logingLog).toBe('object');
    });
});
