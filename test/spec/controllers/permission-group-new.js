'use strict';

describe('Controller: PermissionGroupNewCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionGroupNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionGroupNewCtrl = $controller('PermissionGroupNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionGroupNewCtrl.awesomeThings.length).toBe(3);
  });
});
