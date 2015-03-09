angular.module('service.alert', [])
    .factory('alertService', function($rootScope) {
	// create an array of alerts available globally
	$rootScope.alerts = [];

	return {
	    add: function(type, msg) {
		$rootScope.alerts.push({'type': type, 'msg': msg});
	    },

	    closeAlert: function(index) {
		console.log("Muuuuuh");
		$rootScope.alerts.splice(index, 1);
	    }
	};
    });
