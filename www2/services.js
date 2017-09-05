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


.factory('myFactory', function($ionicHistory,$ionicSideMenuDelegate,$state,$ionicPopup){
	return {
		goHome : function() {
			$ionicHistory.nextViewOptions({disableBack: true});
			$ionicSideMenuDelegate.canDragContent(true);
			$state.go('app.home');				
		},
		goLogin : function() {
			$state.go('app.login');				
		},
		goLogout : function() {
			window.localStorage.setItem("logged","0");
			$state.go('app.login');				
		},
		birthDate : function (d) {
			//alert(d);
			var temp  = d.slice(8,10)+"/"+d.slice(5,7)+"/"+d.slice(0,4);
			//alert(temp);
			return temp;
		},
		birthDateInput : function (d) {
			//alert(d);
			var temp  = new Date(parseInt(d.slice(0,4)), parseInt(d.slice(5,7)-1), parseInt(d.slice(8,10)));
			//alert(temp);
			return temp;
		},
		aviso : function(t,m) {
			var alertPopup = $ionicPopup.alert({
				title: t,
				template: m
			});
			alertPopup.then(function(res) {
				console.log('showAlert');
			});
			// use como em: myFactory.aviso('título','mensagem');
		}
	}
})

/*
$scope.d = $scope.data.nascimento;
$scope.datetemp = $scope.d.slice(8,10)+"/"+$scope.d.slice(5,7)+"/"+$scope.d.slice(0,4);
//var temp = new Date($scope.data.nascimento.year(),$scope.data.nascimento.day(),$scope.data.nascimento.month());
var temp = new Date(1960,0,17); // cuidado com o janeiro zero
//var temp = new Date($scope.data.nascimento).toLocaleDateString(); // cuidado com o janeiro zero
//alert(new Date($scope.data.nascimento));
//var temp = new Date(parseInt($scope.data.nascimento.slice(0,4),4),parseInt($scope.data.nascimento.slice(0,5),2),parseInt($scope.data.nascimento.slice(8,2),2)); 
//alert($scope.d.slice(8,10)+"/"+$scope.d.slice(5,7)+"/"+$scope.d.slice(0,4));
temp = new Date(parseInt($scope.d.slice(0,4)), parseInt($scope.d.slice(5,7)-1), parseInt($scope.d.slice(8,10)))
$scope.data.nascimento = temp;		
*/

; //--//
