'use strict';

describe('Directive: viewMockup', function() {

    // load the directive's module
    beforeEach(module('mockuperApp'));

    var element,
        scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function($compile) {
        element = angular.element('<view-mockup></view-mockup>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the viewMockup directive');
    }));
});
