'use strict';

describe('Directive: lastNews', function () {

  // load the directive's module
  beforeEach(module('mockuperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<last-news></last-news>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the lastNews directive');
  }));
});
