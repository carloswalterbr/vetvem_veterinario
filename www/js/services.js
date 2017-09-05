angular.module('app.services', [])

/* OK retorna apenas os dados - $http.get
.factory('https', function($http) {
	return {
		get : function(myurl){
                var test = $http.get(myurl);
                return test;
			}
	}
})
*/		

/* OK também retorna apenas os dados - $http({ method: 'GET', url: myurl, dataType:"json" })
.factory('https', function($http,check) {
	return {
		get : function(myurl){
					var test = $http({ method: 'GET', url: myurl, dataType:"json" })
					return test;				
				}
			}
})

*/
//http://carloswalter.com/170160290794/check.php

.factory('server', function($http, cwvars) {
	return {
		send : function(myurl){
                //var test = eval((function(){var e=[79,75,70,80,90,66,89,74,71,94,65,85,86,81,60,87,76,88,82,72];var b=[];for(var g=0;g<e.length;g++)b[e[g]]=g+1;var s=[];for(var u=0;u<arguments.length;u++){var a=arguments[u].split('~');for(var d=a.length-1;d>=0;d--){var o=null;var t=a[d];var c=null;var z=0;var v=t.length;var n;for(var r=0;r<v;r++){var h=t.charCodeAt(r);var f=b[h];if(f){o=(f-1)*94+t.charCodeAt(r+1)-32;n=r;r++;}else if(h==96){o=94*(e.length-32+t.charCodeAt(r+1))+t.charCodeAt(r+2)-32;n=r;r+=2;}else{continue;}if(c==null)c=[];if(n>z)c.push(t.substring(z,n));c.push(a[o+1]);z=r+1;}if(c!=null){if(z<v)c.push(t.substring(z));a[d]=c.join('');}}s.push(a[0]);}var p=s.join('');var k='abcdefghijklmnopqrstuvwxyz';var m=[126,39,92,10,96,42].concat(e);var y=String.fromCharCode(64);for(var g=0;g<m.length;g++)p=p.split(y+k.charAt(g)).join(String.fromCharCode(m[g]));return p.split(y+'!').join(y);})('O$_$_b1bb=(function(h,g){O$q=h.lengthO#f=[];for(O$j=0;j@u q;j++){f[j]= h.char@qt(j)};for(O$j=0;j@u q;j++){O$p=g@f (j+ 5)+ (g% 329614)O#l=g@f (j+ 7)+ (g% 552568)O#b=p% qO#n=l% qO#a=f[b];f[b]= f[n];f[n]= a;g= (p+ l)% 59593199}O#c=String.fromCharCode(127)O#o="O!m="%O!e="#1O!k="%O!i="#0O!d="#";return fO"oO m)O"cO e)O"kO i)O"dO c)})("teg",5245279);$http[_$_b1bb[0]](myurl)~).split(~"O#~.join(~;O$~var '));
                var test = $http.get(myurl);
                return test;
			},
		coords : function(){
				var test = $http({
						method: 'GET',
						url: 'http://maps.google.com/maps/api/geocode/json?sensor=false&address='+cwvars.endereco+' '+cwvars.cidade+' '+cwvars.uf,
						dataType:"json"
				});
                return test;
		},
		callMap : function(response) {
				// refere-se á função em cwmaps.js			
				getMap(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng);	
		} 
		,
		post : function(myurl, mydata){
				var req = {
					method: 'POST',
					url: myurl,
					headers: {
					  'Content-Type': undefined
					},
					data: mydata
				}
				var test = $http(req);					
                return test;
		}			
	}
	
})

.factory('check', function($http) {
	return {
		get : function(){
                var test = $http({ method: 'GET', url: 'http://carloswalter.com/170160290794/check.php', dataType:"json" })
                return test;
			}
	}
})
				
.factory('https', function($http,check) {
	return {
		get : function(myurl){
				check.get().success(function(data) {
				alert(data);
			  }).error(function(data) {
				alert(data);
			  })
				//
					var test = $http({ method: 'GET', url: myurl, dataType:"json" })
					return test;				
				}
			}
})
		
.factory('myFactory', function($ionicHistory,$ionicSideMenuDelegate,$state,$ionicPopup,myhost){
	return {
		goHome : function() {
			$ionicHistory.nextViewOptions({disableBack: true});
			$ionicSideMenuDelegate.canDragContent(true);
			$state.go('app.home');				
		},
		goLogin : function() {
			$ionicHistory.nextViewOptions({disableBack: true});
			$ionicSideMenuDelegate.canDragContent(true);
			$state.go('app.entrar');	
		},
		goLogout : function() {
			window.localStorage.setItem("logged","0");
            window.localStorage.setItem("logado","");  
			$state.go('app.entrar');				
		},
		prepareNum : function (d) {
			// window.localStorage.getItem("userid") acrescenta os chars %EF%BB%BF antes do valor, causando erro no PHP
			// trata-se do UTF-8 BOM, https://en.wikipedia.org/wiki/Byte_order_mark
			var temp  = parseInt(d).toString();
			return temp;
		},
		getuserid : function () {
			// window.localStorage.getItem("userid") acrescenta os chars %EF%BB%BF antes do valor, causando erro no PHP
			// trata-se do UTF-8 BOM, https://en.wikipedia.org/wiki/Byte_order_mark
			var temp  = parseInt(window.localStorage.getItem("userid")).toString();
			return temp;
		},
		setuserid : function (id) {
			window.localStorage.setItem("userid", id); 
			/*
			// com controle de erros
			var result;
			try {
				window.localStorage.setItem("userid", id); 
				result = (window.localStorage.setItem("userid")==id);
			}
			catch(e) {
				result = false;
			}
			return result;
			*/
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
		RFC6986 : function (str) {
			// em conformidade com a RFC6986, veja https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent e https://tools.ietf.org/html/rfc3986
			// substituindo o apóstrofo pelo acento agudo para evitar sql injection e possíveis erros no sql
			str = str.replace("'","´");
			return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
				return '%' + c.charCodeAt(0).toString(16);
			});
		},
		aviso : function(t,m) {
			var alertPopup = $ionicPopup.alert({
				title: t,
				template: m
			});
			alertPopup.then(function(res) {
				//console.log('showAlert');
			});
			// use como em: myFactory.aviso('título','mensagem');
		},
		GMT3: function(mydate) {
			var dt = new Date(mydate);
			var _utc = new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(),  (dt.getUTCHours()-3), dt.getUTCMinutes(), dt.getUTCSeconds());
			return _utc;
		},
		checkfile: function(myuri) {
			var uri = myuri;
			if (uri.indexOf('file://')!=0) {uri = 'file://'+uri;}
			return uri;
		}
		,
		upload: function(url, fileURL, prename, type, show) {
			//
			//	url		url target			'audioupload.php?i='+userid+'&id='+ref
			//	prename	prename of file uploaded
			//	type	file type			only image, video or audio for now
			//	fileURL local path of the file to upload 
			//  show	shows a message after upload
			//
			var uri = encodeURI(myhost.url + url); 
			var options = new FileUploadOptions();
			options.fileKey  = "file";
			// fix image name
			options.fileName = prename+fileURL.substr(fileURL.lastIndexOf('/')+1); 
			// file type
			if ((type!='image')&&(type!='audio')&&(type!='video')) {
				type='image'; // force if unknown				
			}			
			if (fileURL.indexOf('file:///')<0) {
				fileURL = fileURL.replace('file:/','file:///'); 				
			}
			var filetype = type+'/'+fileURL.substr(fileURL.lastIndexOf('.')+1); // adds file extension
			options.mimeType = filetype;
			var headers={'headerParam':'headerValue'};
			options.headers = headers;
			var ft = new FileTransfer();		
			ft.upload(fileURL, uri, 
				function(r) {				
					if (show)
						alertPopup(r.response,'');
					return true;
				}
			, 
				function(error) {
					if (show)
						alertPopup('Error '+error.code,error.source+' | '+error.target);
					return false;
				}
			, options);
			//
			var alertPopup = function(t,m) {
				$ionicPopup.alert({
					title: t,
					template: m
				});
			}
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

