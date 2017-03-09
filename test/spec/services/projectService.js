'use strict';

describe('Service: projectService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var projectService;
    beforeEach(inject(function(_projectService_) {
        projectService = _projectService_;
    }));

    it('should do something', function() {
        expect(!!projectService).toBe(true);
    });

});
