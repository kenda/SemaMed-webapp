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
	    .when('/', { templateUrl: 'views/overview.html', controller: 'DrugCtrl' })
	    .when('/about', { templateUrl: 'views/about.html' })
	    .when('/drug/add', { templateUrl: 'views/drug_form.html', controller: 'DrugFormCtrl' })
	    .when('/drug/edit/:id', { templateUrl: 'views/drug_form.html', controller: 'DrugFormCtrl' })
	    .when('/debug', { templateUrl: 'views/debug.html', controller: 'DebugCtrl' })
	    .when('/settings', { templateUrl: 'views/settings.html' })
	    .otherwise({ redirectTo: '/' });
    })
    .config(function ($translateProvider) {
	$translateProvider
	    .useStaticFilesLoader({
		prefix: 'lang/',
		suffix: '.json'
	    })
	    .determinePreferredLanguage();
    });
