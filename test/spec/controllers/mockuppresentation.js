'use strict';

describe('Controller: MockuppresentationCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var MockuppresentationCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MockuppresentationCtrl = $controller('MockuppresentationCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {

    });
});
