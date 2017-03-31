'use strict';

/**
 * @ngdoc function
 * @name simulatorApp.controller:NewDeviceCtrl
 * @description
 * # NewDeviceCtrl
 * Controller of the simulatorApp
 */
angular.module('simulatorApp').controller('NewDeviceCtrl', function ($scope, $http, $window, $timeout) {
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
	$scope.lists = {
		device_types : ['Pressure','Flow','Temp','Vibration'],
		device_sub_types : {
			Pressure : [9817,9828,9836,9841,9845],
			Flow : [9817,9828,9836,9841,9845],
			Temp : [57517],
			Vibration : [57517]
		},
		variable_status_list : ['0xc0','0x80','0x40'],
		variable_value_list : {
			Pressure : ['Flow','Discharge P','Suction P','Strainer dP','Seal Pressure','Seal Level'],
			Flow : ['Flow','Discharge P','Suction P','Strainer dP','Seal Pressure','Seal Level'],
			Temp : ['Vibration 1','Peakvue 1','Vibration 2','Peakvue 2','Bear Temp 1','Bear Temp 2'],
			Vibration : ['Vibration 1','Peakvue 1','Vibration 2','Peakvue 2','Bear Temp 1','Bear Temp 2']
		},
		update_rate_options : [1,5,10,20,30,60,120,180,240,300],
		units : {
			Pressure : [
				"InH2O 68F",  //PU_inH2OAt68F:  2.4864110E+02, //Inch of water at 68F                  
				"InHg 0C",    //PU_inHgAt0C: 3.3863800E+03, // Inch of mercury at 0C                   
				"FtH2O 68F",  //PU_ftH20At68F: 2.9836932E+03, // Foot of water at 68F                  
				"mmH2O 68F",  //PU_mmH20At68F: 9.7890218E+00, // Milimeter of water at 68F                    
				"mmHg 0C",    //PU_mmHgAt0C: 1.3332200E+02, //Milimeter of mercury at 0C                  
				"PSI ",       //PU_psi: 6.8947570E+03,    //                                                           
				"bar",        //PU_bars: 1.0000000E+05,   //                                           
				"mbar",       //PU_milliBars: 1.0000000E+02, //                                        
				"g/Sqcm",     //PU_gramPerSqCm: 9.8066500E+01, //Gram per square centimetre            
				"kg/Sqcm ",   //PU_kiloGramPerSqCm: 9.8066500E+04, //Kilogram per square centimetre    
				"kPa",        //PU_kiloPascals: 1.0000000E+03,   //                                    
				"Torr",       //PU_torr: 1.3332200E+02, //                                             
				"atm",        //PU_atm: 1.0132500E+05, //Atmosphere                                    
				"InH2O 60F",  //PU_inH2OAt60F: 2.4884283E+02, //Inch of water at 60F                   
				"cmH2O 4C",   //PU_cmH2OAt4C: 9.8063749E+01, //Centimetre of water at 4C               
				"mH2O 4C",    //PU_mH2OAt4C: 9.8063749E+03, //Meter of water at 4C                     
				"cmHg 0C",    //PU_cmHGAt0C: 1.3332240E+03, //Centimetre of mercury at 0C              
				"lbs/ft^2",   //PU_psf: 4.7880260E+01, //Pounds per Square Foot Pressure               
				"hPascals",   //PU_hectoPascals: 1.0000000E+02, //                                     
				"kg/m^2",     //PU_kgsm: 9.8066500E+00, //Kiligram  per square meter                   
				"FtH2O 4C",   //PU_ftH2OAt4C: 2.9889831E+03,  //Foot of water at 4C                    
				"FtH2O 60F",  //PU_ftH2OAt60F: 2.9861139E+03, //Foot of water at 60F                   
				"mHg 0C",     //PU_mHGAt0C: 1.3332240E+05, //Meter of mercury at 0C                    
				"MPSI",       //PU_megaPascals: 1.0000000E+06, //                                      
				"InH2O 4C",   //PU_inH20At4C: 2.4908200E+02, //Inch of water at 4C                     
				"mmH2O 4C",   //PU_mmH20At4C: 9.8063800E+00, //Millimeter of water at 4C  
				"kg/cm^2",    //TESTING UNIT equal to Kg/Sqcm   
				"mmWc",       //Millimeters water column
			],
			Flow : [
				"ft^3/min",    //pies cubicos por minuto
				"gal/min",     //galones por minuto
				"l/min",        //litros por minuto
				"IG/min",       //
				"m^3/hr",       // metros cubicos por hora
				"gal/s",        //galones por segundo 
				"Mgal/day",     //Megagalones por dia
				"l/s",          //Litros por segundo
				"Ml/day",       //Megalitros por dia
				"ft^3/s",        //Pies cubicos por segundo
				"ft^3/day",     //Pies cubicos por dia
				"m^3/s",        //Metros cubidos por segundo
				"m^3/day",      //Metros cubicos por dia
				"IG/hr",        //
				"IG/day",       //
				"n m^3/hr",     //Metros cubicos NORMALES por hora
				"n l/hr",       //litros cubicos NORMALES por hora
				"std ft^3/min", //pies cubidos estadar por minuto
				"ft^3/hr",      //Pies cubicos por hora
				"m^3/min",      //Metros cubicos por minuto
				"barrels/s",    //Barriles por segundo
				"barrels/min",  //Barriles por minuto
				"barrels/hr",   //Barriles por hora
				"barrels/day",  //Barriles por día
				"gal/hr",       //Galones por hora
				"IG/s",         //
				"l/hr",         //litros por hora
				"gal/day",      //galones por dia
			],
			Temp : [
				"degC", //Grados centigrados
				"degF", //Grados faranheit
				"degR", //Grados Racon
				"degK", //Grados Kelvin
			],
			Vibration : [
				"in/sec", //pulgadas por segundo
				"mm/sec", //milimetros por segundo
			],
			Peakvue : [
				"g's",     //??
				"m/sec^2", //metros por segundo cuadrado
			],
			Seallevel : [
				"%"       //porcentaje
			]
			
		}
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
	$scope.reset_device_type = function(){
		console.log($scope.dataModel.device_type);
		$scope.dataModel.device_type = null;
	}
    $scope.onChange = function(){
	    //console.log('changed', $scope.dataModel);
    };
    $scope.new_device = function(){
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
	    console.log('Var list',$scope.dataModel.var_list);
		console.log('Pressed',$scope.dataModel);
		$http.post('http://192.241.187.135:3100/api/device',$scope.dataModel).
		then(function(response) {
			
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

		},
		function(response) {
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
