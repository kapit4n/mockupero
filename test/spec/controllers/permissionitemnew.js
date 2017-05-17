'use strict';

describe('Controller: PermissionitemnewCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionitemnewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionitemnewCtrl = $controller('PermissionitemnewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionitemnewCtrl.awesomeThings.length).toBe(3);
  });
});
