
var app = angular.module('app', ['ionic', 'app.controllers','app.routes','app.services'])

app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		/*if (window.cordova && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		  cordova.plugins.Keyboard.disableScroll(true);
		}*/
		if (window.StatusBar) {
		  StatusBar.styleDefault();
		}
		document.addEventListener("online", onOnline, false);
		document.addEventListener("resume", onResume, false);
		document.addEventListener("offline", onOffline, false);
		loadMapsApi();   
		 console.log("navigator.camera loaded");
		 console.log("device.cordova:"+device.cordova);
		 console.log("cordova.file loaded");
		 console.log("FileTransfer:	"+FileTransfer);
	})
});
	
app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
	// Allow same origin resource loads.
	'self',
	// Allow loading from our assets domain.  Notice the difference between * and **.
	'http://strapp.azurewebsites.net/**',
	'http://carloswalter.com/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  //$sceDelegateProvider.resourceUrlBlacklist([ 'http://myapp.example.com/clickThru**' ]);
});
	
app.value('myhost' , { url:'http://carloswalter.com/170160290794/'});

//

var htmlSelectUF = '<select ng-model = "data.uf" ><option>AC</option><option>AL</option><option>AP</option><option>AM</option><option>BA</option><option>CE</option><option>DF</option><option>ES</option><option>GO</option><option>MA</option><option>MT</option><option>MS</option><option>MG</option><option>PA</option><option>PB</option><option>PR</option><option>PE</option><option>PI</option><option>RJ</option><option>RN</option><option>RS</option><option>RO</option><option>RR</option><option>SC</option><option>SP</option><option>SE</option><option>TO</option></select>';
app.value('cwvars' , { codserv:0, selectUF:htmlSelectUF, userimage:'img/MolduraFoto.jpg', endereco:' ', cidade:' ', uf:' ',seq:100 });
