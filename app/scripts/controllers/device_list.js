'use strict';

/**
 * @ngdoc function
 * @name simulatorApp.controller:DeviceListCtrl
 * @description
 * # DeviceListCtrl
 * Controller of the simulatorApp
 */
angular.module('simulatorApp').controller('DeviceListCtrl', function ($scope, $http, $window, $location) {
    $scope.init = function(){
		getList();
	};
	function getList(){
		$http.get('http://192.241.187.135:3100/api/devices/ASC/1000').
		then(function(response) {
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
		console.log('ID changed:',device.id,'State:',device.active);
		
		$http.get('http://192.241.187.135:3100/api/device/toggle/'+device.id+'/'+device.active).
		then(function(response) {
			if(response.data && response.data.status){
		    	console.log(response.data);
		    }
		});
		
	};
	$scope.new_device = function () {
		$location.path('/new_device');
	};
	$scope.goToURL = function(id){
	    console.log('id',id);
    }
  });
