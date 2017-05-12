'use strict';

/**
 * @ngdoc service
 * @name simulatorApp.Lists
 * @description
 * # Lists
 * Service in the simulatorApp.
 */
angular.module('simulatorApp')
  .service('ListService', function (ServerCommunicator) {
    this.getList = function(success,error){
		ServerCommunicator.callInternalServer('get',null,'api/list',success,error);
	};
  });
