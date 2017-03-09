'use strict';

describe('Controller: ProjectNewCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var ProjectNewCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ProjectNewCtrl = $controller('ProjectNewCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('Initital values', function() {
        expect(scope.projectName).toBe('');
        expect(scope.objType).toBe("Project");
        expect(scope.objName).toBe("");
        expect(scope.description).toBe('');
        expect(scope.imgToShow).toBe('');
    });
});
