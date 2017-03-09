'use strict';

describe('Controller: MockupNewCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var MockupNewCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MockupNewCtrl = $controller('MockupNewCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(scope.name).toBe('');
        expect(scope.objType).toBe('Mockup');
        expect(scope.objName).toBe('');
        expect(scope.description).toBe('');
        expect(scope.imgToShow).toBe('');
        expect(scope.imgToShow).toBe('');
        expect(scope.project.id).toBe(undefined);
    });
});
