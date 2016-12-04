'use strict';

describe('Controller: ProjectEditCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var ProjectEditCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ProjectEditCtrl = $controller('ProjectEditCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('Initial values', function() {
        expect(scope.project).toBe(null);
    });
});
