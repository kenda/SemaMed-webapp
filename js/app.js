angular
    .module('semamed', [
	'semamed.config'
    ])
    .run(function($window, $rootScope) {
	$rootScope.online = navigator.onLine;
	$window.addEventListener("offline", function () {
            $rootScope.$apply(function() {
		$rootScope.online = false;
            });
	}, false);
	$window.addEventListener("online", function () {
            $rootScope.$apply(function() {
		$rootScope.online = true;
            });
	}, false);
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
	});
    })
    .controller('DrugCtrl', function($scope, $routeParams, $location, Drug, alertService){
	$scope.drug = Drug;

	Drug.getDrugs().then(function(data){
	    $scope.drugs = data;
	}, function(err){
	    return;
	});

	$scope.deleteDrug = function(drugID){
	    Drug.deleteDrug(drugID)
		.then(function(){
		    // TODO update overview
		    // $location.path("/");
		    // Drug.getDrugs().then(function(data){
		    // 	$scope.drugs = data;
		    // }, function(err){
		    // 	return;
		    // });
		    console.log("Drug successfully removed.");
		    alertService.add("success", "Successfully removed drug");
		}, function(err){
		    console.log(err);
		});
	};
    })
    .controller('DrugFormCtrl', function($scope, $routeParams, $location, Drug, alertService){
	$scope.drugForm = {};
	
	$scope.submitDrugForm = function(isValid){
	    if (isValid){
		var drug = {
		    id: $scope.drugForm.label.replace(/ /g,''),
		    label: $scope.drugForm.label,
		    ingredient: $scope.drugForm.ingredient,
		    ingredient_uri: $scope.drugForm.ingredient_uri,
		    form: $scope.drugForm.form,
		    taking_morning: $scope.drugForm.taking_morning,
		    taking_noon: $scope.drugForm.taking_noon,
		    taking_evening: $scope.drugForm.taking_evening,
		    taking_night: $scope.drugForm.taking_night,
		    taking_unit: $scope.drugForm.taking_unit,
		    dosage: $scope.drugForm.dosage,
		    dosage_unit: $scope.drugForm.dosage_unit,
		    notes: $scope.drugForm.notes,
		    reason: $scope.drugForm.reason
		};
		Drug.addDrug(drug).then(function(data){
		    console.log("successfully added drug " + drug.id);
		    if ($routeParams.id)
			msg = "Successfully modified drug.";
		    else
			msg = "Sucessfully added drug.";
		    alertService.add("success", msg);
		    $location.path("/");
		}, function(err){
		    console.log(err);
		});
	    }
	};

	if ($routeParams.id){
	    Drug.getDrug($routeParams.id)
	    .then(function(data){
		$scope.drugForm = data;
	    }, function(err){
		console.log(err);
	    });
	}
    })
    .controller('DebugCtrl', function($scope, Drug){
	Drug.test()
	    .then(function(data){
		$scope.data = data;
		}, function(err){console.log(err);});
    })
    .controller('RootCtrl', function($scope, $location, alertService){

//function RootCtrl($rootScope, $location, alertService) {
	$rootScope.changeView = function(view) {
	    $location.path(view);
	};

	// root binding for alertService
	$rootScope.closeAlert = alertService.closeAlert; 
    });
//RootCtrl.$inject = ['$scope', '$location', 'alertService'];
