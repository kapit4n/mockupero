'use strict';

describe('Service: mockupVersionService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var mockupVersionService;
    beforeEach(inject(function(_mockupVersionService_) {
        mockupVersionService = _mockupVersionService_;
    }));

    it('should do something', function() {
        expect(!!mockupVersionService).toBe(true);
    });

});
