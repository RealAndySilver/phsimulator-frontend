'use strict';

/**
 * @ngdoc function
 * @name simulatorApp.controller:DeviceListCtrl
 * @description
 * # DeviceListCtrl
 * Controller of the simulatorApp
 */
angular.module('simulatorApp').controller('DeviceListCtrl', function ($scope, $http, $window, $location, DeviceService, ListService) {
    $scope.init = function(){
		getList();
	};
	$scope.filtered_devices = {};
	function getList(){
		DeviceService.listDevices(function(response) {
			if(response.data && response.data.status){
		    	$scope.device_list = response.data.data;
		    	$scope.device_list.forEach(function(device){
			    	console.log('Device app tag', device.device_tag,'App name:',device.data.app_name);
			    	if(device.data.app_name == undefined || device.data.app_name == ""){
				    	device.data.app_name = "Unlinked Devices";
			    	}
			    	if(!$scope.filtered_devices[device.data.app_name]){
				    	$scope.filtered_devices[device.data.app_name] = [];
			    	}
			    	$scope.filtered_devices[device.data.app_name].push(device);
		    	});
		    }
		    else{
			    $scope.app_list = [];
		    }
		});
	}
	ListService.getList(function(response){
		$scope.lists = response.data.data;
		getList();
	});
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
