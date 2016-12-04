'use strict';

describe('Service: chatService', function() {

    // load the service's module
    beforeEach(module('mockuperApp'));

    // instantiate service
    var chatService;
    beforeEach(inject(function(_chatService_) {
        chatService = _chatService_;
    }));

    it('should do something', function() {
        expect(!!chatService).toBe(true);
    });

});
