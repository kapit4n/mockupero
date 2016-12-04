'use strict';

describe('Controller: NavigationdiagramCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var NavigationdiagramCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        NavigationdiagramCtrl = $controller('NavigationdiagramCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(NavigationdiagramCtrl.awesomeThings.length).toBe(3);
    });
});
