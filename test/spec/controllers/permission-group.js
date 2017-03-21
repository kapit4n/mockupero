'use strict';

describe('Controller: PermissionGroupCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionGroupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionGroupCtrl = $controller('PermissionGroupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionGroupCtrl.awesomeThings.length).toBe(3);
  });
});
