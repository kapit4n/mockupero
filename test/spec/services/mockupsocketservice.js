'use strict';

describe('Service: mockupSocketService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var mockupSocketService;
    beforeEach(inject(function(_mockupSocketService_) {
        mockupSocketService = _mockupSocketService_;
    }));

    it('should do something', function() {
        expect(!!mockupSocketService).toBe(true);
    });

});
