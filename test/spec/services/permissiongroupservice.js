'use strict';

describe('Service: permissionGroupService', function () {

  // load the service's module
  beforeEach(module('mockuperApp'));

  // instantiate service
  var permissionGroupService;
  beforeEach(inject(function (_permissionGroupService_) {
    permissionGroupService = _permissionGroupService_;
  }));

  it('should do something', function () {
    expect(!!permissionGroupService).toBe(true);
  });

});
