'use strict';

describe('Service: breadcrumbService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var breadcrumbService;
    beforeEach(inject(function(_breadcrumbService_) {
        breadcrumbService = _breadcrumbService_;
    }));

    it('should do something', function() {
        expect(!!breadcrumbService).toBe(true);
    });

});
