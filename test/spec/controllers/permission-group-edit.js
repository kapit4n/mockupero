'use strict';

describe('Controller: PermissionGroupEditCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionGroupEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionGroupEditCtrl = $controller('PermissionGroupEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionGroupEditCtrl.awesomeThings.length).toBe(3);
  });
});
