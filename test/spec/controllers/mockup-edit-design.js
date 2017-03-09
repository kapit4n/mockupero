'use strict';

describe('Controller: MockupEditDesignCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var MockupEditDesignCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MockupEditDesignCtrl = $controller('MockupEditDesignCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(scope.chatCollapsed).toBe(true);
        expect(scope.hidefooter).toBe(undefined);
    });
});
