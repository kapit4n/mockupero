'use strict';

describe('Service: CommentService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var CommentService;
    beforeEach(inject(function(_CommentService_) {
        CommentService = _CommentService_;
    }));

    it('should do something', function() {
        expect(!!CommentService).toBe(true);
    });

});
