'use strict';

describe('Service: mockupService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var mockupService;
    beforeEach(inject(function(_mockupService_) {
        mockupService = _mockupService_;
    }));

    it('should do something', function() {
        expect(!!mockupService).toBe(true);
    });

});
