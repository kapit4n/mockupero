'use strict';

describe('Service: permissionItem', function () {

  // load the service's module
  beforeEach(module('mockuperApp'));

  // instantiate service
  var permissionItem;
  beforeEach(inject(function (_permissionItem_) {
    permissionItem = _permissionItem_;
  }));

  it('should do something', function () {
    expect(!!permissionItem).toBe(true);
  });

});
