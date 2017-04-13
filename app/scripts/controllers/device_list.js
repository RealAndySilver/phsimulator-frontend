'use strict';

/**
 * @ngdoc function
 * @name simulatorApp.controller:DeviceListCtrl
 * @description
 * # DeviceListCtrl
 * Controller of the simulatorApp
 */
angular.module('simulatorApp').controller('DeviceListCtrl', function ($scope, $http, $window, $location, DeviceService) {
    $scope.init = function(){
		getList();
	};
	function getList(){
		DeviceService.listDevices(function(response) {
			if(response.data && response.data.status){
		    	$scope.device_list = response.data.data;
		    	console.log(response.data.data);
		    }
		    else{
			    $scope.app_list = [];
		    }
		});
	}
	$scope.getList = getList;
	$scope.changed = function(device){
		device.active = device.active ? 1:0;
		DeviceService.toggleDeviceByID(device.id,device.active,
		function(response){
			if(response.data && response.data.status){
		    	
		    }
		}, 
		function(response){
			console.log('Error toggling device');
		});
		
	};
	$scope.new_device = function () {
		$location.path('/new_device');
	};
	$scope.goToURL = function(id){
	    console.log('id',id);
    }
  });
