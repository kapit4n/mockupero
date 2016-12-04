'use strict';

describe('Service: permissionService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var permissionService;
    beforeEach(inject(function(_permissionService_) {
        permissionService = _permissionService_;
    }));

    it('should do something', function() {
        expect(!!permissionService).toBe(true);
    });

});
