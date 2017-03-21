'use strict';

describe('Service: permissionItemService', function () {

  // load the service's module
  beforeEach(module('mockuperApp'));

  // instantiate service
  var permissionItemService;
  beforeEach(inject(function (_permissionItemService_) {
    permissionItemService = _permissionItemService_;
  }));

  it('should do something', function () {
    expect(!!permissionItemService).toBe(true);
  });

});
