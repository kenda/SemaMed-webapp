angular.module('service.drug', [])
    .factory('Drug', function($q) {
	var db = levelgraph("semamed");
	return {
	    test: function(){
		var deferred = $q.defer();
		db.get({}, function(err, list){
		    deferred.resolve(list);
		});
		return deferred.promise;
	    },
	    getDrugs: function() {
		var deferred = $q.defer();
		db.search([
		    {subject: db.v("s"), predicate: "type", object: "Drug"},
		    {subject: db.v("s"), predicate: db.v("p"), object: db.v("o")}
		], function(err, list) {
		    // translate search results to drug objects
		    var result = {};
		    for (var triple in list ){
			var id = list[triple]["s"];
			if (result[id] === undefined) result[id] = {};
			result[id][list[triple]["p"]] = list[triple]["o"];
		    }
		    deferred.resolve(result);
		});
		return deferred.promise;
	    },
	    getDrug: function(id){
		var deferred = $q.defer();
		db.get({subject: id}, function(err, list){
		    var result = {};
		    for (var triple in list ){
			result[list[triple]["predicate"]] = list[triple]["object"];
		    }
		    deferred.resolve(result);
		});
		return deferred.promise;
	    },
	    addDrug: function(drug) {
		var deferred = $q.defer();
		var triples = [
		    {subject: drug.id, predicate: "type", object: "Drug"}
		];
		for (var key in drug) {
		    if (drug.hasOwnProperty(key)) {
			triples.push(
			    {subject: drug.id, predicate: key, object: drug[key]}
			);
		    }
		}
		db.put(triples, function(err) {
		    deferred.resolve();
		});
		return deferred.promise;
	    },
	    deleteDrug: function(id){
		var deferred = $q.defer();
		db.get({subject: id}, function(err, list){
		    db.del(list, function(err){
			deferred.resolve();
		    });
		});
		return deferred.promise;
	    }
	};
    });
