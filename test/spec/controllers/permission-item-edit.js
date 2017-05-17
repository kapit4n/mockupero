'use strict';

describe('Controller: PermissionItemEditCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionItemEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionItemEditCtrl = $controller('PermissionItemEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionItemEditCtrl.awesomeThings.length).toBe(3);
  });
});
