'use strict';

describe('Controller: PermissionGroupListCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionGroupListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionGroupListCtrl = $controller('PermissionGroupListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionGroupListCtrl.awesomeThings.length).toBe(3);
  });
});
