angular
    .module('semamed.config', [
	'barcodeGenerator',
	'ngRoute',
	'pascalprecht.translate',
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
	    .when('/export', { templateUrl: 'views/export.html', title: "Export" })
	    .when('/export/datamatrix', { templateUrl: 'views/export-datamatrix.html', title: "Export as DataMatrix" })
	    .otherwise({ redirectTo: '/' });
    })
    .config(function ($translateProvider) {
	$translateProvider
	    .useStaticFilesLoader({
		prefix: '../lang/',
		suffix: '.json'
	    })
	    .determinePreferredLanguage();
    });
