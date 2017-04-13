'use strict';

/**
 * @ngdoc service
 * @name simulatorApp.Server
 * @description
 * # Server
 * Service in the simulatorApp.
 */
angular.module('simulatorApp')
.service('ServerService', function (ServerCommunicator) {
	this.getStatus = function(success,error){
		ServerCommunicator.callExternalServer('get',null,'/general/admin/status',success, error);
	};
});
