'use strict';

describe('Service: test', function () {

  // load the service's module
  beforeEach(module('mockuperApp'));

  // instantiate service
  var test;
  beforeEach(inject(function (_test_) {
    test = _test_;
  }));

  it('should do something', function () {
    expect(!!test).toBe(true);
  });

});
