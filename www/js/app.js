
var app = angular.module('app', ['ionic', 'app.controllers','app.routes','app.services','ui.rCalendar', 'ngAnimate'])

app.run(function($ionicPlatform, $ionicPopup, $state, $ionicHistory, $ionicSideMenuDelegate) {
	$ionicPlatform.ready(function() {
		/*
		if (window.cordova && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		  cordova.plugins.Keyboard.disableScroll(true);
		}
		*/
		if (window.StatusBar) {
		  StatusBar.styleDefault();
		}
		setTimeout(function() {
			navigator.splashscreen.hide();
		}, 3000);		
		
		//document.addEventListener("online", onOnline, false);
		//document.addEventListener("resume", onResume, false);
		//document.addEventListener("offline", onOffline, false);
		loadMapsApi();    	
		/*
		window.addEventListener("orientationchange", function(){
			$rootScope.$emit("virou", {});
		});		
		*/
	});
    
	// cancela a funcionalidade do backbutton na tela home
	$ionicPlatform.registerBackButtonAction(function(event) {
		switch ($state.current.name)
		{
			case "app.home":
				// nada
				break;
			case "app.arealizar":
			case "app.pendentes":
			case "app.financ":
			case "app.transferencia":
			case "app.calendar":
				$ionicSideMenuDelegate.toggleLeft(); // chama o menu
			default:
				$ionicHistory.goBack(); // volta à anterior
				break;
		}
	}, 100); 
});
	
var htmlSelectUF = '<select ng-model = "data.uf" ><option>São Paulo</option><option selected>Rio de Janeiro</option><option>Minas Gerais</option></select>';

app.value('cwvars' , { 
                        codserv:0, 
                        selectUF:htmlSelectUF, 
                        userid:0, 
                        username:'', 
                        userimage:'img/Consumidor.jpg', 
                        endereco:' ', 
                        cidade:' ', 
                        uf:' ', 
                        seq:100, 
                        userespec:'', 
                        especs:{} , 
                        aconfirmar:0 
});

app.value('myhost' , { url:'http://carloswalter.com/170160290794/'}); // <--- substituir pela do cliente
//app.value('myhost' , { url:'http://vetvem.com.br/admin/mobile/'}); 

app.value('mydata' , {});
app.value('vacinas', {});










