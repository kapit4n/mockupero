'use strict';

describe('Service: headerService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var headerService;
    beforeEach(inject(function(_headerService_) {
        headerService = _headerService_;
    }));

    it('should do something', function() {
        expect(!!headerService).toBe(true);
    });

});
