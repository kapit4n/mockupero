'use strict';

describe('Service: workflowService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var workflowService;
    beforeEach(inject(function(_workflowService_) {
        workflowService = _workflowService_;
    }));

    it('should do something', function() {
        expect(!!workflowService).toBe(true);
    });

});
