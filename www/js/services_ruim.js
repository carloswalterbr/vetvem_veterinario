angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])


.factory('myService', function() {
        return {
            foo: function() {
                alert("I'm not a foo!");
            }
			
        };
    })

.factory('myService2', function($ionicPopup) {
	var alerta = function(t,m) {
		var alertPopup = $ionicPopup.alert({
			title: t,
			template: m
		});
		alertPopup.then(function(res) {
			alert(res);
		});				
	}			 
    })



; //--//
