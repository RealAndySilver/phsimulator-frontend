'use strict';

/**
 * @ngdoc function
 * @name simulatorApp.controller:NewDeviceCtrl
 * @description
 * # NewDeviceCtrl
 * Controller of the simulatorApp
 */
angular.module('simulatorApp').controller('NewDeviceCtrl', function ($scope, $http, $window, $timeout, DeviceService, ListService) {
	var var_list = '';
	var polling_info_keys = [];
	var current_object = {};
	$scope.alert = {
		type : null,
		message : {
			strong : '',
			text : ''
		}
	};
	
	$scope.restoreSettings = function(){
		$scope.dataModel.data.settings = $scope.lists.settings;	
	};
	
	$scope.dataModel = {
		device_tag : null,
		device_address : null,
		gateway_tag : null,
		gateway_address : null,
		network_id : null,
		update_rate : null,
		device_type : null,
		var_list : '',
		data : {
			app_name : '',
			override_global_settings : true,
			settings : {}
		},
		polling_info : {
			app : 'pumps',
			device_type_name : '',
			PV : {
				active : false,
				dv_label : 'PV',
				dv_num : null,
				dv_unit : null,
				dv_value : null,
				dv_status : '0xc0'
			},
			SV : {
				active : false,
				dv_label : 'SV',
				dv_num : null,
				dv_unit : null,
				dv_value : null,
				dv_status : '0xc0'
			},
			TV : {
				active : false,
				dv_label : 'TV',
				dv_num : null,
				dv_unit : null,
				dv_value : null,
				dv_status : '0xc0'
			},
			QV : {
				active : false,
				dv_label : 'QV',
				dv_num : null,
				dv_unit : null,
				dv_value : null,
				dv_status : '0xc0'
			},
			DV : {
				active : false,
				dv_label : 'DV',
				dv_num : null,
				dv_unit : null,
				dv_value : null,
				dv_status : '0xc0'
			}
		}
	};
	ListService.getList(function(response){
		$scope.lists = response.data.data;
		$scope.dataModel.data.settings = $scope.lists.settings;
	});
	$scope.reset_device_type = function(){
		console.log($scope.dataModel.device_type);
		$scope.dataModel.device_type = null;
	}
    $scope.onChange = function(){
	    //console.log('changed', $scope.dataModel);
    };
    $scope.createDeviceInInternalServer = function(){
	    $scope.alert={
			type : null,
			message : {
				strong : '',
				text : ''
			}
		};
	    var_list = '';
	    polling_info_keys = Object.keys($scope.dataModel.polling_info);
	    polling_info_keys.forEach(function(variable_name, index){
		    if($scope.dataModel.polling_info[variable_name].active == true){
			    var_list += variable_name+',';
		    }
		   
	    });
	    
	    $scope.dataModel.var_list = var_list.slice(0, -1);
		DeviceService.create($scope.dataModel, 
		function(response) {
			$scope.alert = {
				type : 'success',
				message : {
					strong : 'Success!',
					text : 'Device created'
				}
			};
			$timeout(function(){
				$window.history.back();
			}, 2000);

		},function(response) {
			$scope.alert = {
				type : 'failed',
				message : {
					strong : 'Error!',
					text : 'Request failed.'
				}
			};
		});
	};
  });
