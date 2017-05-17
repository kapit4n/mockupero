'use strict';

describe('Controller: PermissionitemeditCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionitemeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionitemeditCtrl = $controller('PermissionitemeditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionitemeditCtrl.awesomeThings.length).toBe(3);
  });
});
