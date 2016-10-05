'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var UserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCtrl = $controller('UserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('User should be null if there is not any userId like param', function () {
    expect(scope.user).toBe(null);
  });
});
