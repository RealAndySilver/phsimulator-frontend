'use strict';

/**
 * @ngdoc function
 * @name simulatorApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the simulatorApp
 */
angular.module('simulatorApp')
  .controller('SettingsCtrl', function ($scope,$http, ServerCommunicator) {
	  $scope.alert={
		  type : null,
		  message : {
			  strong : '',
			  text : ''
		  }
	  };
	  $scope.update_rate_options = [60,120,180,240,300];
    $scope.init = function(){
		getSettings();
	};
	function getSettings(){
		$http.get('http://192.241.187.135:3100/api/settings/1').
		then(function(response) {
			if(response.data && response.data.status){
		    	$scope.settings = response.data.data;
		    	$scope.settings.data.update_rate = $scope.settings.data.update_rate+'';
		    }
		});
	}
	$scope.update = function(){
		$scope.alert={
			type : null,
			message : {
				strong : '',
				text : ''
			}
		};
		$http.put('http://192.241.187.135:3100/api/settings/1',$scope.settings).
		then(function(response) {
			if(response.data && response.data.status){
		    	getSettings();
		    	$scope.alert={
					type : 'success',
					message : {
						strong : 'Success!',
						text : 'Settings updated'
					}
				};
		    }
		    else{
			    $scope.alert={
					type : 'failed',
					message : {
						strong : 'Error!',
						text : 'Request failed.'
					}
				};
		    }
		});
	};
	$scope.reset = function(){
		$scope.alert.type=null;
		$http.put('http://192.241.187.135:3100/api/settings/default/1',{}).
		then(function(response) {
			if(response.data && response.data.status){
		    	getSettings();
		    	$scope.alert={
					type : 'warning',
					message : {
						strong : 'Success!',
						text : 'Default values restored.'
					}
				};
		    }
		    else{
			    $scope.alert={
					type : 'failed',
					message : {
						strong : 'Error!',
						text : 'Request failed.'
					}
				};
		    }
		});
	};

	$scope.getServerStatus = function(){
		$scope.server_status='';
		ServerCommunicator.callExternalServer('get',null,'/general/admin/status',function(res){
			if(res.data=='ok'){
				$scope.server_status='Ok!';
			}
			else{
				$scope.server_status='Wrong Endpoint.';
			}
		}, function(res){
				$scope.server_status='Something is wrong..';
		});
	};
	
	$scope.toggleSwitch = function(){
		$scope.settings.active = $scope.settings.active ? 1:0;	
		ServerCommunicator.callInternalServer('get',null,'api/settings/toggle/1/'+$scope.settings.active,function(res){
			console.log(res);
		}, function(res){
			console.log('error', res);
		});	
	};
	
  });
