'use strict';

describe('Controller: TestCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var TestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestCtrl = $controller('TestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('Initial values', function () {
    expect(scope.logingLog).toBe(undefined);
    expect(scope.chatList).toBe(undefined);
    expect(scope.userName).toBe(undefined);
  });
});
