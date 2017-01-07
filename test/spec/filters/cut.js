'use strict';

describe('Filter: cut', function () {

  // load the filter's module
  beforeEach(module('mockuperApp'));

  // initialize a new instance of the filter before each test
  var cut;
  beforeEach(inject(function ($filter) {
    cut = $filter('cut');
  }));

  it('should return the input prefixed with "cut filter:"', function () {
    var text = 'angularjs';
    expect(cut(text)).toBe('cut filter: ' + text);
  });

});
