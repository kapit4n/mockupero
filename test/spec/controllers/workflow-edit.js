'use strict';

describe('Controller: WorkflowEditCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var WorkflowEditCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        WorkflowEditCtrl = $controller('WorkflowEditCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(WorkflowEditCtrl.awesomeThings.length).toBe(3);
    });
});
