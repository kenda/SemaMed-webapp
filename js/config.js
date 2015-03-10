angular
    .module('semamed.config', [
	'ngRoute',
	'pascalprecht.translate',
	    //'ui.bootstrap',
	'service.alert',
	'service.drug'
    ])
    .config(function($routeProvider) {
	$routeProvider
	    .when('/', { templateUrl: 'views/overview.html', controller: 'DrugCtrl', title: "Medikationsplan" })
	    .when('/about', { templateUrl: 'views/about.html', title: "Über" })
	    .when('/drug/add', { templateUrl: 'views/drug_form.html', controller: 'DrugFormCtrl', title: "Medikament hinzufügen", returnMenu: true})
	    .when('/drug/edit/:id', { templateUrl: 'views/drug_form.html', controller: 'DrugFormCtrl', title: "Medikament bearbeiten" })
	    .when('/debug', { templateUrl: 'views/debug.html', controller: 'DebugCtrl', title: "Debug" })
	    .when('/settings', { templateUrl: 'views/settings.html', title: "Einstellungen" })
	    .otherwise({ redirectTo: '/' });
    })
    .config(function ($translateProvider) {
	$translateProvider
	    .useStaticFilesLoader({
		prefix: '/lang/',
		suffix: '.json'
	    })
	    .determinePreferredLanguage();
    });
