'use strict';

describe('Service: shareService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var shareService;
    beforeEach(inject(function(_shareService_) {
        shareService = _shareService_;
    }));

    it('should do something', function() {
        expect(!!shareService).toBe(true);
    });

});
