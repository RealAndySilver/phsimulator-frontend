'use strict';

describe('Controller: NewDeviceCtrl', function () {

  // load the controller's module
  beforeEach(module('simulatorApp'));

  var NewDeviceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewDeviceCtrl = $controller('NewDeviceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewDeviceCtrl.awesomeThings.length).toBe(3);
  });
});
