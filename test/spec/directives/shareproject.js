'use strict';

describe('Directive: shareProject', function() {

    // load the directive's module
    beforeEach(module('mockuperApp'));

    var element,
        scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function($compile) {
        element = angular.element('<share-project></share-project>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the shareProject directive');
    }));
});
