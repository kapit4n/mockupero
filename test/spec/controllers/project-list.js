'use strict';

describe('Controller: ProjectlistCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var ProjectlistCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ProjectlistCtrl = $controller('ProjectlistCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('Initial values', function() {
        expect(typeof scope.logingLog).toBe('object');
        expect(angular.isArray(scope.chatList)).toBe(true);
        expect(scope.userName).toBe(undefined);
    });
});
