
angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) { });

  
  // modal login
	$scope.data = {};
	$scope.logindata = {};
	//{'nome':'carlos','email':'eu@mail','nascimento','11/22/33','telefone':'3232326482','cep':'36025-270','cidade':'aqui','uf':'mg'};
	/*
			nome:		data.nome, 
			email:		data.email, 
			nascimento:	data.nascimento, 
			telefone:	data.telefone, 
			endereco:	data.endereco,
			cep:		data.cep,
			cidade:		data.cidade,
			uf:			data.uf		
			
		$scope.records= [];
            $scope.ler = function() {     
                db.executeSql("SELECT int_notif_id, txt_notif_date, txt_notif_jsondata, txt_notif_title , txt_notif_message , txt_notif_url , txt_notif_action , txt_notif_aditionaldata FROM Notifications order by int_notif_id desc ", [], 
                    function (resultSet) {
                        //alert("Notifications resultSet.rows.length = " + resultSet.rows.length);
                        if (resultSet.rows.length > 0)
                        {
                            for (var i = 0; i < resultSet.rows.length; i++) 
                            {
                                $scope.records.push({
                                    id:         resultSet.rows.item(i).int_notif_id, 
                                    date:       resultSet.rows.item(i).txt_notif_date, 
                                    message:    resultSet.rows.item(i).txt_notif_message,
                                    data:       JSON.parse(resultSet.rows.item(i).txt_notif_aditionaldata)
                                });     
                                $scope.$apply();
                                //alert("criou registro "+i);
                            }
                        }
                        else
                        {
                            $scope.records.push({id:0, date: "", message: "Não foram encontradas notificações.", data: [] });
                            $scope.$apply();
                        }
                    }, 
                    function(error) {
    
                    console.log('Notifications SELECT error: ' + error.message);
                        $scope.records.push({id:0, date: "", message: "Ocorreu um erro inesperado", data: [] });
                        $scope.$apply();
                    }
                );
            };
			
			var cw_language_br = "{\"config\":[{";
				cw_language_br += "  \"title\":\"Configurações\" , \"language\":\"Idioma\"}]"; 
			cw_language_br += " ,\"login\": [{\"title\":\"Entrar\" , \"email\":\"E-mail\", \"password\":\"Senha\", \"repeatpassword\":\"Repita a senha\"";
			cw_language_br += " ,\"logface\":\"Entrar com Facebook\", \"createaccount\":\"Registrar-se\", \"name\":\"Nome\",\"nameerr\":\"Nome deve ter 3 letras ou mais\"";
			cw_language_br += " ,\"emailerr\":\"E-mail inválido\",\"passworderr\":\"6 caracteres no mínimo\",\"passworderr2\":\"Senhas diferem\"";
			cw_language_br += " ,\"gender\":\"Sexo\" ,\"male\":\"Masculino\" ,\"female\":\"Feminino\", \"genderquestion\":\"Informe o sexo:\"";
			cw_language_br += " ,\"birthday\":\"Aniversário\" ,\"birthdayerr\":\"Informe seu aniversário\",\"globalerr\":\"Informe todos os campos\"";
			cw_language_br += "}]}"; 
			
			if (localStorage.getItem("language").substring(0,2)=="es" ) {
				cw_language_temp = cw_language_es;
			}  
			//
			try {
				var cw_language = JSON.parse(cw_language_temp); 
				var page_config = cw_language["config"][0];
					alert(page_config.title);
					alert(page_config.language);
				var page_login = cw_language.login[0];
					alert(page_login.title);
					alert(page_login.password);
			}
			catch (ex) {
				  alert(" Erro:"+ex+" ("+localStorage.getItem("language").substring(0,2)+")");
				}
			
			
	*/
  //
	$scope.cadshow = false;
	$scope.esqshow = false;
	$scope.showalert = false;
	$scope.fechamodal = false;
	$scope.leuserdata = function() {
		if (window.localStorage.getItem("userdata")) {
			//alert(window.localStorage.getItem('userdata'));
			$scope.data = JSON.parse(window.localStorage.getItem('userdata'));  
		}	
		//else
			//alert("no localStorage.getItem('userdata')");
	}
	$scope.cadastro = function() {
		$scope.cadshow = true;
	};
	$scope.esqueceu = function() {
		$scope.esqshow = true;
	};
	$scope.closecad = function() {
		$scope.cadshow = false;
	}
	$scope.closeesq = function() {
		$scope.esqshow = false;
	}
	$scope.fecha = function () {
		$scope.modal.hide();
	};
/*	
	$scope.replacer = function replacer(key, value) {
	  if (typeof value === "number") {
		return value.toString();
	  }
	  return value;
	};
*/	
	$scope.doCadastro = function() {
 		//alert(JSON.stringify($scope.data));
		////////////////////////////////////////// window.localStorage.setItem("userdata", JSON.stringify($scope.data)); 
		//alert('gravou userdata');
		$scope.closecad();
	}	
	//
	$scope.shownasc = false;
	$scope.hidetitlenasc = function() {
		$scope.shownasc = true;
	}
	//
	var mytemplate = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';  
	$scope.mymodal = function() {
		$ionicModal.fromTemplateUrl(mytemplate, {scope: $scope}).then(function(modal) {$scope.modal = modal;});
		$scope.modal.show();  
	};
  //

  // template do login modal 
  $ionicModal.fromTemplateUrl('templates/entrar.html', { 
    scope: $scope,
	animation: 'none'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // fecha
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // abre
  $scope.login = function() {
    $scope.modal.show();
  };

	//
  $scope.alerta = function() {
	$scope.showalert = true;
  };

  // submit o form  
  $scope.doLogin = function() {
    console.log('Doing login', $scope.data); 
  };
		 
})

//------------------------------------------------------------------------------------------------------
	.controller('menuCtrl', function($scope, $stateParams, $ionicPopup, cwvars, $rootScope, myFactory) {
		$scope.$on('$ionicView.enter', function(e) {$scope.home();}); // refresh
		//
		$scope.logout = function() { myFactory.goLogout(); }
		$rootScope.$on("updatemenu", function(){
		   $scope.foto = cwvars.userimage;
        });
		$scope.nome = "Nome do Usuário";
		$scope.end = "Cidade, Estado";
		$scope.foto = "img/MolduraFoto.jpg";
		$scope.home = function() {
			if (window.localStorage.getItem("userdata")) {
			$scope.data = JSON.parse(window.localStorage.getItem('userdata')); 				
			$scope.nome = $scope.data.nome;
			$scope.end = $scope.data.cidade+","+$scope.data.uf;
			var image = document.getElementById('myImage');
			image.src = window.localStorage.getItem("userphoto");  
			$scope.foto = image.src;
			}
		};
		
})
//-------------------------------------------------------------------------------=----------
	.controller('homeCtrl', function($scope, $stateParams, $ionicPopup, cwvars, myFactory) {
		$scope.$on('$ionicView.enter', function(e) {$scope.home();}); // refresh
		//	checa se está logado
		if ((!window.localStorage.getItem("logged")||window.localStorage.getItem("logged")=="0")) {
			myFactory.goLogin();
		}
		//
		$scope.home = function() {
			if (window.localStorage.getItem("userdata")) {
				$scope.data = JSON.parse(window.localStorage.getItem('userdata')); 				
				$scope.nome = $scope.data.nome;
				$scope.end = $scope.data.cidade+","+$scope.data.uf;
				//alert($scope.data.end);
				//alert($scope.data.endereco);
				var image = document.getElementById('myImage');
				image.src = window.localStorage.getItem("userphoto");  
				cwvars.endereco = $scope.data.endereco;
				cwvars.cidade = $scope.data.cidade;
				cwvars.uf = $scope.data.uf;
			}
			//else {
			//	alert("localStorage.getItem('userdata') - falhou");				
			//}
		};
		$scope.nome = "Nome do Usuário";
		$scope.end = "Cidade, Estado";

		
		
		 // Triggered on a button click, or some other target
		 $scope.showPopup = function() {
		   $scope.data = {}

		   // An elaborate, custom popup
		   var myPopup = $ionicPopup.show({
			 template: '<input type="password" ng-model="data.wifi">',
			 title: 'Enter Wi-Fi Password',
			 subTitle: 'Please use normal things',
			 scope: $scope,
			 buttons: [
			   { text: 'Cancel' },
			   {
				 text: '<b>Save</b>',
				 type: 'button-positive',
				 onTap: function(e) {
				   if (!$scope.data.wifi) {
					 //don't allow the user to close unless he enters wifi password
					 e.preventDefault();
				   } else {
					 return $scope.data.wifi;
				   }
				 }
			   },
			 ]
		   });
		   myPopup.then(function(res) {
			 console.log('Tapped!'+ res);
		   });
		   /*
		   $timeout(function() {
			  myPopup.close(); //close the popup after 3 seconds for some reason
		   }, 3000);
		   */
		  };
		  
		   // A confirm dialog
		   $scope.showConfirm = function() {
			 var confirmPopup = $ionicPopup.confirm({
			   title: 'título',
			   template: 'mensagem'
			 });
			 confirmPopup.then(function(res) {
			   if(res) {
				 // yes
			   } else {
				 // no
			   }
			 });
		   };

		   // An alert dialog
		   $scope.showAlert = function() {
			 var alertPopup = $ionicPopup.alert({
			   title: '111Don\'t eat that!',
			   template: 'It might taste good'
			 });
			 alertPopup.then(function(res) {
			   console.log('Thank you for not eating my delicious ice cream cone');
			 });
		   };
		   
	$scope.pagetitle = "HOME";
			   //document.getElementById("tc").innerHTML = "showConfirm";
})


.controller('entrarCtrl', function($scope, $stateParams) {
	$scope.pagetitle = "Entrar";

})
		.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

		 // Triggered on a button click, or some other target
		 $scope.showPopup = function() {
		   $scope.data = {}

		   // An elaborate, custom popup
		   var myPopup = $ionicPopup.show({
			 template: '<input type="password" ng-model="data.wifi">',
			 title: 'Enter Wi-Fi Password',
			 subTitle: 'Please use normal things',
			 scope: $scope,
			 buttons: [
			   { text: 'Cancel' },
			   {
				 text: '<b>Save</b>',
				 type: 'button-positive',
				 onTap: function(e) {
				   if (!$scope.data.wifi) {
					 //don't allow the user to close unless he enters wifi password
					 e.preventDefault();
				   } else {
					 return $scope.data.wifi;
				   }
				 }
			   },
			 ]
		   });
		   myPopup.then(function(res) {
			 console.log('Tapped!'+ res);
		   });
		   /*
		   $timeout(function() {
			  myPopup.close(); //close the popup after 3 seconds for some reason
		   }, 3000);
		   */
		  };
		  
		   // A confirm dialog
		   $scope.showConfirm = function() {
			 var confirmPopup = $ionicPopup.confirm({
			   title: 'D�vida cruel',
			   template: 'Por que disable o moal atr�s de mim?'
			 });
			 confirmPopup.then(function(res) {
			   if(res) {
				 alert('You are sure');
			   } else {
				 alert('You are not sure');
			   }
			 });
		   };

		   // An alert dialog
		   $scope.showAlert = function() {
			 var alertPopup = $ionicPopup.alert({
			   title: '111Don\'t eat that!',
			   template: 'It might taste good'
			 });
			 alertPopup.then(function(res) {
			   console.log('Thank you for not eating my delicious ice cream cone');
			 });
		   };
		   
		})
		
//-------------------------------------------------------------------------
.controller('animaisCtrl', function($scope, $stateParams, $state, cwvars) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();}); // refresh
	$scope.pagetitle = "Animais";
	$scope.foto = cwvars.userimage;
	//
	$scope.cadanimal = function() {
		$state.go('app.cadanimal');
	};
	// 
	$scope.inicio = function() {
		if (window.localStorage.getItem("userdata")) {
			$scope.data = JSON.parse(window.localStorage.getItem('userdata')); 				
			$scope.nome = $scope.data.nome;
			$scope.end = $scope.data.cidade+","+$scope.data.uf;		
			$scope.foto = window.localStorage.getItem("userphoto");  
		}		
		if (window.localStorage.getItem("animais")) {
			//alert(window.localStorage.getItem("animais"));
			$scope.data = JSON.parse(window.localStorage.getItem("animais"));	
		}
		//else
			//alert("sem window.localStorage.getItem('animais')");
	};
	$scope.home = function() {
		if (window.localStorage.getItem("userdata")) {
			$scope.udata = JSON.parse(window.localStorage.getItem('userdata')); 				
			$scope.nome = $scope.udata.nome;
			$scope.end = $scope.udata.cidade+","+$scope.udata.uf;
			var image = document.getElementById('myImage');
			image.src = window.localStorage.getItem("userphoto");  
			$scope.foto = image.src;
		}
	};
	$scope.nome = "Nome do Usuário";
	$scope.end = "Cidade, Estado";
})

//-------------------------------------------------------------------------------------------------------------------------------------
.controller('cadanimalCtrl', function($scope, $stateParams, $ionicActionSheet, $ionicPopup, $ionicHistory, myFactory, cwvars, $state) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();}); // refresh
	$scope.pagetitle = ($stateParams.num==""?'Cadastrar Animal':'Animal');
	$scope.indice = 0;
	// para criar um nome de arquivo único a cada nova imagem
	$scope.dateValue = new Date();
	$scope.dateforfile = $scope.dateValue.getMilliseconds();
	$scope.newfilename = "";
	//
	// only once
		//window.localStorage.removeItem("animais");
	//	
	$scope.inicio = function() {
		if (window.localStorage.getItem("animais")) {
			$scope.data = JSON.parse(window.localStorage.getItem("animais")); 
			if ($stateParams.num!='') { // alteração
				$scope.dados = $scope.data.animais[$stateParams.num];			
				$scope.indice = $stateParams.num; 
			}
			else { ; // cadastro
				$scope.indice = $scope.data.animais.length
				$scope.dados = {};				
			}
		}
		else {	// 1o. cadastro
			$scope.dados = {};
			$scope.tmp = '{"animais":[]}';
			$scope.data = JSON.parse($scope.tmp);
		}
	}
   //
	$scope.doCadastro = function() {
		$scope.data.animais[$scope.indice] = $scope.dados;
		window.localStorage.setItem("animais", JSON.stringify($scope.data));  
		$ionicHistory.goBack(-1);
	}	
   
   //
	$scope.novafoto = function() { 
		var myPopup = $ionicActionSheet.show({
		scope: $scope,
		buttons: [
			{ text: 'Tirar com a camera' },
			{ text: 'Escolher da galeria' },
		],
		titleText: 		'<h4>Editar Foto</h4>',
		cancelText: 	'Cancelar',
		cssClass: 		'social-actionsheet',
		cancel: 		function() { },
		buttonClicked: 	function(index) {
							if (index==0)
								$scope.tirarfoto();
							if (index==1)
								$scope.escolherfoto();
							return true;
						}
		});
	};
	$scope.tirarfoto = function() {		
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 100,
			targetHeight: 100,
			encodingType: Camera.EncodingType.JPEG,
			mediaType: Camera.MediaType.PICTURE,
			allowEdit: true,
			correctOrientation: true			
			});
	}
	$scope.escolherfoto = function() {		
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
			encodingType: Camera.EncodingType.JPEG,
			mediaType: Camera.MediaType.PICTURE,
			allowEdit: true,
			correctOrientation: true			
			});
	}

    function onFail(message) {
		myFactory.aviso('Ação cancelada','');
    }   
    function onSuccess(imageURI) {	
		// camera retorna path real do jpg, mas galeria atepna uri no formato content://media/external/images/media/135674
		// então é necessário gravar localmente o arquivo para possibilitar o upload
		$scope.photo = imageURI; // apenas para visualização no ionic view, que não tem suporte para File e FileTransfer
		createFileEntry(imageURI);
		
				/*
				var server = myhost.url+'testemysql.php';
				//
				var trustAllHosts = true;
				var ftOptions = new FileUploadOptions();
				ftOptions.fileKey = 'file';
				ftOptions.fileName = $scope.photo.substr($scope.photo.lastIndexOf('/') + 1);
				ftOptions.mimeType = 'image/jpeg';
				ftOptions.chunkedMode = false;
				ftOptions.httpMethod = 'POST';

				  if(ionic.Platform.isAndroid()){
					$cordovaFileTransfer.upload(encodeURI(server),$scope.photo,ftOptions) 
					.then(function(result) {
				
					}
				*/
		
    }
	
	function createFileEntry(imageURI) {
		window.resolveLocalFileSystemURL(imageURI, copyFile, fail);    	// resolve a uri da imagem
	}
	
	function copyFile(fileEntry) {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, 	// resolve o path da área padrão de armazenameto
			function(fileSystem2) {
				$scope.newfilename = "animal_"+$scope.indice+"_"+$scope.dateforfile+".jpg";	// cria arquivo único a cada imagem, relacionando com a ordem na lista
				fileEntry.copyTo( fileSystem2, $scope.newfilename, onCopySuccess, fail);	// copia o conteúdo da uri para o novo arquivo
		  }, fail ); 
	}	
	
	function onCopySuccess(entry) {
		$scope.foto 		= cordova.file.dataDirectory+$scope.newfilename;
		$scope.dados.image 	= cordova.file.dataDirectory+$scope.newfilename;
		$scope.$apply();	// alimenta a imagem da página e seu registro
	}

	function fail(error) {
		myFactory.aviso('Ocorreu um erro inesperado:',error.code);
	}	
	
	/*
	function createNewFileEntry(imageURI) {
		window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

			// JPEG file
			dirEntry.getFile("tempFile_"+$scope.indice+".jpeg", { create: true, exclusive: false }, function (fileEntry) {

				// Do something with it, like write to it, upload it, etc.
				alert("got file: " + fileEntry.fullPath);
				writeFile(fileEntry, imageURI);
				fileEntry.copyTo(fileSystem2, "file3.jpg", onCopySuccess, fail);
				//
				$scope.foto = fileEntry.fullPath;
				$scope.dados.image = fileEntry.fullPath;
				$scope.$apply(imageURI);
				// displayFileData(fileEntry.fullPath, "File copied to");

			}, onErrorCreateFile);

		}, onErrorResolveUrl);
	}
	
	function onErrorCreateFile(err) { alert('onErrorCreateFile:'+err); }
	function onErrorResolveUrl(err) { alert('onErrorResolveUrl:'+err); }
	
	function writeFile(fileEntry, dataObj) {
		// Create a FileWriter object for our FileEntry (log.txt).
		fileEntry.createWriter(function (fileWriter) {

			fileWriter.onwriteend = function() {
				alert("Successful file write...");
				//readFile(fileEntry);
			};

			fileWriter.onerror = function (e) {
				alert("Failed file write: " + e.toString());
			};

			// If data object is not passed in,
			// create a new Blob instead.
			if (!dataObj) {
				dataObj = new Blob(['some file data'], { type: 'text/plain' });
			}

			fileWriter.write(dataObj);
		});
	}	
	*/
	
/*
	// apenas extrai o ultimo nome da sequencia -não traz o verdadeiro caminho físico
	function extrai(filename){
		alert(filename);
		window.resolveLocalFileSystemURI(filename, foi, naofoi);		
	}
	function foi(fileEntry){
		
		alert (fileEntry.name);
	}
	function naofoi(){
		alert("erro e resolveLocalFileSystemURI");
	}
*/	



})






/*
.controller('caogatoCtrl', function($scope, $stateParams) {
	$scope.pagetitle = $stateParams.origem;
	switch($stateParams.origem) {
		case "Vacinar":
		$scope.url = "vacinas";
		//cw_vars.codserv = 2;
		break;
	}	
})
*/


.controller('vacinavetCtrl', function($scope, $stateParams) { 
	$scope.pagetitle = $stateParams.tipo+$stateParams.num;
	$scope.vacina = $stateParams.num;
	$scope.data = [{'nome':'Josué Gomes Nathan','spec':'Cirurgião Especialista','end':'São Paulo -SP','valor':'120,00','num':'1','image':'img/CaesIcone.jpg'}, {'nome':'Dr. Billy','spec':'Clínico Geral','end':'São Paulo -SP','valor':'120,00','num':'2','image':'img/CaesIcone.jpg'}, {'nome':'Dr. Billy','spec':'Clínico Geral','end':'São Paulo -SP','valor':'120,00','num':'3','image':'img/CaesIcone.jpg'}];
})

.controller('especCtrl', function($scope, $stateParams, cwvars) { 
	$scope.pagetitle = "Mágica";
	$scope.num = $stateParams.num;
	$scope.data = [{'num':1, 'nome':'Acupuntura Veterinária','desc':'descrição da especialidade'},{'num':2, 'nome':'Anestesiologia Veterinária','desc':'descrição da especialidade'},{'num':3, 'nome':'Clínica Geral','desc':'descrição da especialidade'}];
	switch($stateParams.tipo) {
		case "consulta":
		$scope.pagetitle = "Consultas";
		cwvars.codserv = 1;
		break;
		case "curativo":
		$scope.pagetitle = "Curativos";
		cwvars.codserv = 3;
		break;
		case "medicamento":
		$scope.pagetitle = "Medicamentos";
		cwvars.codserv = 4;
		break;
	}	
})

.controller('atendCtrl', function($scope, $stateParams, $ionicPopup, $state, $ionicHistory, myFactory, cwvars, $http) { 
	$scope.pagetitle = "Localização do Atendimento";//$stateParams.tipo+$stateParams.num;
	$scope.data = [{'end':'Rua Comendador Martinelli, 38','end2':'Glória, Rio de Janeiro'}];
	$scope.tipo = $stateParams.tipo;
	$scope.num = $stateParams.num;
	$scope.tipoatend = ($stateParams.tipo=="Consulta"?'CONSULTA':'SOLICITAÇÃO');
	$scope.lat = 0;
	$scope.lng = 0;
	$scope.end = cwvars.endereco;
	$scope.uf = cwvars.cidade+', '+cwvars.uf;
	//-----------------------------
	$scope.coords = function() {
        $http({
                method: 'GET',
                url: 'http://maps.google.com/maps/api/geocode/json?sensor=false&address='+cwvars.endereco+' '+cwvars.cidade+' '+cwvars.uf,
                dataType:"json"
        }).then(
            function (response) {
                $scope.lat = response.data.results[0].geometry.location.lat;
                $scope.lng = response.data.results[0].geometry.location.lng;
				//alert('2:'+$scope.lat+'/'+$scope.lng);
				$scope.local();
            }
            , function(response) {
                    //Second function handles error
                    //$scope.content = "Something went wrong: "+response.status    ;
                    alert("Something went wrong: "+response.status)    ;
                }
        );
	}
	//-------------------------
	$scope.local = function() {
		//getMapLocation();
		getMap($scope.lat, $scope.lng);
	}	
	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
		title: 'título',
		template: 'mensagem'
		});
		alertPopup.then(function(res) {
		alert('após o ok');
		});
	};
	$scope.showConfirm = function() {
		var confirmPopup = $ionicPopup.confirm({
		title: 'Encontraremos um veterinário para você e lhe avisaremos',
		template: ''
		});
		confirmPopup.then(function(res) {
		if(res) {
			//alert("envia solicitação ao banco")
			$scope.backhome();
		} else {
			//alert(res)
		}
		});
	};
	$scope.backhome = function() {
		myFactory.goHome();
	}
	$scope.goahead = function() {
		//$state.go('app.vacinavet',{tipo:$stateParams.tipo, num:$stateParams.num});		
		$state.go('app.vet',{tipo:$stateParams.tipo, num:$stateParams.num});		
	}
})

//---------------------------------------------------------
.controller('solicitCtrl', function($scope, $stateParams) {
	$scope.pagetitle = "Solicitações em Andamento";
	/*
	$scope.cor = function(st) {
		if (st) return 'green';
		else return 'red';
	}
	$scope.estado = function(st) {
		if (st) return 'confirmado';
		else return 'aguardando';
	}
	// <span style="color:{{cor(solicit.status)}}">{{estado(solicit.status)}}</span>
	*/
	$scope.data = [{'nome':'Josué Gomes Nathan da Silva','spec':'Cirurgião Especialista','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':true}];
})

//---------------------------------------------------------
.controller('servicosCtrl', function($scope, $stateParams) {
	$scope.pagetitle = "Serviços";
	$scope.data = [{'nome':'Josué Gomes Nathan da Silva','spec':'Cirurgião Especialista','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':true}];
})

//---------------------------------------------------------
.controller('pagpendCtrl', function($scope, $stateParams) {
	$scope.pagetitle = "Pagamentos Pendentes";
	$scope.data = [{'nome':'Josué Gomes Nathan da Silva','spec':'Cirurgião Especialista','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':true}];
})

//---------------------------------------------------------
.controller('examesCtrl', function($scope, $stateParams) {
	$scope.pagetitle = "Exames";
	$scope.data = [{'nome':'Josué Gomes Nathan da Silva','spec':'Cirurgião Especialista','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':true}];
})

//---------------------------------------------------------
.controller('vetCtrl', function($scope, $stateParams, cwvars) {
	$scope.pagetitle = "Veterinários";
	$scope.tipo = $stateParams.tipo;
	$scope.num = $stateParams.num;
	switch($stateParams.tipo) {
		case "exames":
		//$scope.pagetitle = "Exames";
		cwvars.codserv = 5;
		break;
		case "consulta":
		//$scope.pagetitle = "Consultas";
		cwvars.codserv = 1;
		break;
	}	
	$scope.data = [{'nome':'Josué Gomes Nathan da Silva','spec':'Clínico geral','end':'São Paulo - SP','valor':'120,00','num':'1','image':'img/vet01.png','status':false}, {'nome':'Dr. Antonio Carlos Rocha','spec':'Clínico geral','end':'São Paulo - SP','valor':'130,00','num':'2','image':'img/vet02.png','status':false}, {'nome':'Dra. Ana Rosa Penido','spec':'Clínico Geral','end':'São Paulo - SP','valor':'100,00','num':'3','image':'img/vet03.png','status':true}];
})


//---------------------------------------------------------
.controller('vacinasCtrl', function($scope, $stateParams, $state) {
	$scope.pagetitle = "Vacinas para "+($stateParams.tipo==0?'Cães':'Gatos');
	$scope.tipo = $stateParams.tipo;
	$scope.datac = [{'nome':'Vacina para cães I','desc':'Descrição da vacina para cães I','num':'1'}, {'nome':'Vacina para cães II','desc':'Descrição da vacina para cães II','num':'2'}, {'nome':'Vacina para cães III','desc':'Descrição da vacina para cães III','num':'3'}];
	$scope.datag= [{'nome':'Vacina para gatos I','desc':'Descrição da vacina para gatos I','num':'1'}, {'nome':'Vacina para gatos II','desc':'Descrição da vacina para gatos II','num':'2'}, {'nome':'Vacina para gatos III','desc':'Descrição da vacina para gatos III','num':'3'}];
	$scope.data = ($stateParams.tipo==0?$scope.datac:$scope.datag);
	$scope.go = function(a,b) {
		$state.go('app.atend',{tipo:a, num:b});		
	}
})

//---------------------------------------------------------
.controller('caogatoCtrl', function($scope, $stateParams, cwvars) {
	$scope.pagetitle = $stateParams.origem;
	switch($stateParams.origem) {
		case "Vacinar":
		$scope.url = "vacinas";
		cwvars.codserv = 2;
		break;
	}	
})

//-------------------------------------------------------------------------------------------------------------------------------------------
.controller('agendarCtrl', function($scope, $stateParams, $ionicPopup, cwvars, $ionicHistory, $state, cwvars, myFactory, $ionicActionSheet) { 
	$scope.$on('$ionicView.enter', function(e) {$scope.ledados();}); // refresh
	$scope.pagetitle = "Agendar";
	$scope.tiposervico = cwvars.codserv;
	$scope.codservico = $stateParams.tipo;
	//
	$scope.medico = $stateParams.num-1;
	$scope.datavet = [{'nome':'Josué Gomes Nathan da Silva','spec':'Clínico geral','end':'São Paulo - SP','valor':'120,00','num':'1','image':'img/vet01.png','status':false}, {'nome':'Dr. Antonio Carlos Rocha','spec':'Clínico geral','end':'São Paulo - SP','valor':'130,00','num':'2','image':'img/vet02.png','status':false}, {'nome':'Dra. Ana Rosa Penido','spec':'Clínico Geral','end':'São Paulo - SP','valor':'100,00','num':'3','image':'img/vet03.png','status':true}];	//
	$scope.image = $scope.datavet[$scope.medico].image;
	$scope.nome = $scope.datavet[$scope.medico].nome;
	$scope.end = $scope.datavet[$scope.medico].end;
	$scope.spec = $scope.datavet[$scope.medico].spec;
	//
	$scope.titulo = "Aguarde a confirmação com seu médico em até 72 horas";
	//$scope.mensagem = "Atendimento para:<br/>"+cwvars.endereco+", "+cwvars.cidade+", "+cwvars.uf+"<button class='button button-block custom' type='button' ng-click='showPopup()'> Editar endereço</button>";
	$scope.mensagem = "-- nada --";
	$scope.logindata = {};
	$scope.cadshow = false;
	$scope.esqshow = false;
	$scope.showalert = false;
	$scope.ledados = function() {
		$scope.data = JSON.parse(window.localStorage.getItem('userdata')); 
		//$scope.mensagem = "<b>Atendimento para:</b><br/>"+$scope.data.endereco+", "+$scope.data.cidade+", "+$scope.data.uf+"<button class='button button-block custom' type='button' ng-click='showPopup()'> Editar endereço</button>";		
		$scope.mensagem = "<b>Atendimento para:</b>"+$scope.data.endereco+", "+$scope.data.cidade+", "+$scope.data.uf;		
	}   
   // Custom popup
   $scope.showPopup = function() {
      /*
	  $scope.data.end = cwvars.endereco;
      $scope.data.cidade = cwvars.cidade;
      $scope.data.uf = cwvars.uf;
	  */
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.endereco" placeholder="Endereço" style="border-bottom:1px solid #999"><input type = "text" ng-model = "data.cidade"  placeholder="Cidade" style="border-bottom:1px solid #999">Estado: '+cwvars.selectUF,    
         title: 'Editar endereço',
         subTitle: 'Informe os novos dados do endereço ',
         scope: $scope,
         buttons: [
            { text: 'Cancelar' }, 
			{
				text: 'Agendar',
				type: 'button-positive',
				onTap: function(e) {						
					if ((!$scope.data.endereco)||(!$scope.data.cidade)||(!$scope.data.uf)) {
						e.preventDefault();
					} else {
						return $scope.data;
					}
                }
            }
         ]
      });
      myPopup.then(function(res) { 
        //alert('Tapped!'+ res.end); 
		if (res!=undefined) {
			$scope.newdata = JSON.parse(window.localStorage.getItem('userdata')); 
			$scope.newdata.endereco = $scope.data.endereco;
			$scope.newdata.cidade = $scope.data.cidade;
			$scope.newdata.uf = $scope.data.uf;
			//alert($scope.newdata.nome+"/"+$scope.newdata.endereco+"/"+$scope.newdata.cidade+"/"+$scope.newdata.uf);
			window.localStorage.setItem("userdata", JSON.stringify($scope.newdata)); 
			//$scope.data = JSON.parse(window.localStorage.getItem('userdata')); 
			//alert($scope.data.nome+"/"+$scope.data.end+"/"+$scope.data.cidade+"/"+$scope.data.uf);
			//$scope.ledados();
			$scope.gravaagenda();
			//alert('gravou'); 
		}
      });    
   };   
/*	
   $scope.confirma = function() { 
      var myPopup = $ionicPopup.show({
         title: $scope.titulo,
         template: $scope.mensagem,    
         scope: $scope,
         buttons: [
            { text: 'Cancelar' }, {
               text: '<b>Agendar</b>',
               type: 'button-positive',
                  onTap: function(e) {
						//myPopup.close();
						return true;
                  }
            }
         ]
      });
      myPopup.then(function(res) {
		 //alert("res:"+res);
	   if(res) {
		 // yes
	   } else {
		 // no
	   }
		//
		$scope.gravaagenda();
      });    
   };   
*/   
   $scope.confirma2 = function() { 
      var myPopup = $ionicActionSheet.show({
         scope: $scope,
         buttons: [
			{ text: 'Agendar' },
            { text: 'Alterar Endereço' },
            { text: 'Cancelar' }
         ],
		/*destructiveText: 'Delete',*/
		titleText: '<h4>Aguarde a confirmação com seu médico em até 72 horas<h5>'+$scope.mensagem+'</h5></h4>',
		cancelText: 'Cancelar',
		cssClass: 'social-actionsheet',
		cancel: function() {
		  // add cancel code..
		  //alert("cancel");
		},
		buttonClicked: function(index) {
			//alert(index);
			if (index==0)
				$scope.gravaagenda();
			if (index==1)
				$scope.showPopup();
			return true;
		}
		/*
		,
		destructiveButtonClicked: function() {
			alert("destructiveButtonClicked");
			return true;
		}
		*/
      });
   };
   
   //
   $scope.gravaagenda = function() {
	   // grava agenda 
	   myFactory.aviso('Agendamento solicitado','');
	   myFactory.goHome();
   }
   
   // An alert dialog
   $scope.showAlert = function(t,m) {
	 var alertPopup = $ionicPopup.alert({
	   title: t,
	   template: m
	 });
	 alertPopup.then(function(res) {
	   console.log('Thank you for not eating my delicious ice cream cone');
	 });
   };
   $scope.goahead = function() {
			$scope.alerta();
    };   
})


//-------------------------------------------------------------------------------------------------------	
.controller('loginCtrl', function($scope, $stateParams, $ionicSideMenuDelegate, $ionicHistory, $state, $ionicPopup, myFactory, $http) {
	$ionicSideMenuDelegate.canDragContent(false);
	$scope.data = {};
	$scope.fechamodal = false;
	//
	$scope.esqueceu = function() {
		$scope.esqshow = true;
	};
	$scope.fecha = function () {
		$scope.modal.hide();
	};
	$scope.home = function() {
		myFactory.goHome();
	}
	//
	$scope.esqueci = function() {
	   var myPopup = $ionicPopup.show({
		 title: 'Recuperação de Senha',
		 subTitle: 'Insira o email cadastrado',
		 template: '<input type="text" placeholder="Insira o e-mail cadastrado" ng-model="data.email">',
		 scope: $scope,
		 buttons: [
		   { text: 'Cancelar' },
		   {
			 text: '<b>Enviar</b>',
			 type: 'button-energized',
			 onTap: function(e) {
			   if (!$scope.data.email) {
				 e.preventDefault();
			   } else {
				 return $scope.data.email;
			   }
			 }
		   },
		 ]
	   });
	   myPopup.then(function(res) {
		//alert('email:'+ res + "/"+(res==undefined)); 
		if (res!=undefined) {
			// envia o email (res) para o server !!!			 
			//alert('envia o email (res) para o server');
			myFactory.aviso("Solicitação enviada","Aguarde instruções sobre a senha");
		}
	   });   	   
	}
	//
	$scope.doLogin = function() {
		if (navigator.connection.type === Connection.NONE) {
			myFactory.aviso('Sem conexão de internet','Verifique sua conexão e tente novamente.');
		}	
		else {
			$http({
					method: 'GET',
					url: 'http://strapp.azurewebsites.net/listaplace.cshtml',
					dataType:"json"
			}).then(
				function (response) {
					$scope.content = response.data;
					$scope.result = response.data.results;
					$scope.statuscode = response.status;
					$scope.statustext = response.statusText;   
					// seta como logado
					window.localStorage.setItem("logged","1")
					//myFactory.aviso('Resposta:',response.statusText);	
					myFactory.goHome();
				}
				, function(response) {
						//Second function handles error
						myFactory.aviso('Ocorreu um erro inesperado:',response.status);
						//$scope.content = "Something went wrong: "+response.status    ;
					}
			);			
		}
		
	}
})

//-------------------------------------------------------------------------------------------------------------------------------
.controller('cadastroCtrl', function($scope, $stateParams, $state, $ionicHistory, $ionicSideMenuDelegate, $ionicPopup, myFactory) {  
	$scope.pagetitle = "Criar Conta";
	$scope.datetemp = "dd/mm/aaaa";
	$scope.closecad = function() {
		$state.go('app.login');	
	}
	$scope.leuserdata = function() {
		if (window.localStorage.getItem("userdata")) {
			//alert(window.localStorage.getItem('userdata'));
			$scope.data = JSON.parse(window.localStorage.getItem('userdata'));  
			$scope.datetemp = $scope.data.nascimento.slice(0, 10);
			$scope.nascimento = $scope.data.nascimento.toLocaleDateString();		
			var image = document.getElementById('myImage');
			image.src = window.localStorage.getItem("userphoto");  
			cwvars.endereco = $scope.data.endereco;
			cwvars.cidade = $scope.data.cidade;
			cwvars.uf = $scope.data.uf;
		}	
		//else
		//	alert("no localStorage.getItem('userdata')");
	}
	$scope.doCadastro = function() {
		//alert(JSON.stringify($scope.data));
		window.localStorage.setItem("userdata", JSON.stringify($scope.data));  
		//alert('gravou userdata');
		// seta como logado
		window.localStorage.setItem("logged","1");
		$scope.home();
	}	
	//
	$scope.shownasc = false;
	$scope.hidetitlenasc = function() { 
		$scope.shownasc = true;
	}
	$scope.home = function() {
		myFactory.goHome();
	}	
})
		
		
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
.controller('perfilCtrl', function($scope, $stateParams, $state, $ionicHistory, $ionicSideMenuDelegate, $ionicPopup, myFactory, cwvars, $rootScope, $http, $ionicActionSheet) {
	$scope.$on('$ionicView.enter', function(e) {$scope.leuserdata();}); // refresh
	$scope.pagetitle = "Editar Perfil";
    $scope.data = {};    
	$scope.datetemp = "mm/dd/aaaa";
	$scope.showpwd = true;
	$scope.shownasc = false;
	$scope.foto = cwvars.userimage;
	//
	$scope.newfilename = "";
	$scope.dateValue = new Date();
	$scope.dateforfile = $scope.dateValue.getMilliseconds();		
	//
	$scope.altsenha = function() {
		$scope.showpwd = false;
		$scope.showPopup();
	}
	$scope.mudarfoto = function() {
		//
	}
	$scope.leuserdata = function() {
		if (window.localStorage.getItem("userdata")) {
			$scope.data = JSON.parse(window.localStorage.getItem('userdata')); 
			//alert($scope.data.end);
			//alert($scope.data.endereco);
			$scope.datetemp = myFactory.birthDate($scope.data.nascimento);			
			$scope.data.nascimento = myFactory.birthDateInput($scope.data.nascimento);
			var image = document.getElementById('myImage');
			image.src = window.localStorage.getItem("userphoto");  
			$scope.foto =  window.localStorage.getItem("userphoto");  
			cwvars.endereco = $scope.data.endereco;
			cwvars.cidade = $scope.data.cidade;
			cwvars.uf = $scope.data.uf;
		}
	}	
	$scope.doCadastro = function() {
		window.localStorage.setItem("userdata", JSON.stringify($scope.data)); 
		myFactory.goHome();
	}	
	//
	$scope.hidetitlenasc = function() {
		$scope.shownasc = true; 
	}
//
   $scope.showPopup = function() {
      var myPopup = $ionicPopup.show({
         template: '<input type = "password" ng-model = "data.pwd" placeholder="Senha atual" style="border-bottom:1px solid #999"><input type = "password" ng-model = "data.newpwd" placeholder="Nova senha" style="border-bottom:1px solid #999"><input type = "password" ng-model = "data.newpwd2"  placeholder="Repita a senha" style="border-bottom:1px solid #999">	',    
         title: 'Alterar Senha',
         subTitle: 'Informe a nova senha ',
         scope: $scope,
         buttons: [
            { text: 'Cancelar' }, 
			{
				text: '<b>Salvar</b>',
				type: 'button-stable',
				onTap: function(e) {						
					if ((!$scope.data.pwd)||(!$scope.data.newpwd)||(!$scope.data.newpwd2)) {
						e.preventDefault();
					} else {
						return $scope.data;
						myPopup.close();
					}				
				}
            }
         ]
      });
      myPopup.then(function(res) {
         //alert('Tapped:'+ res+ "/"+(res==undefined));
		 if (res!=undefined)
			 myFactory.aviso("Senha alterada com sucesso","");
			//alert(res.pwd+"/"+res.newpwd+"/"+res.newpwd2);
      });    
   };   
   //
   $scope.novafoto = function() { 
      var myPopup = $ionicActionSheet.show({
         scope: $scope,
         buttons: [
			{ text: 'Tirar com a camera' },
            { text: 'Escolher da galeria' },
         ],
		/*destructiveText: 'Delete',*/
		titleText: '<h4>Editar Foto</h4>',
		cancelText: 'Cancelar',
		cssClass: 'social-actionsheet',
		cancel: function() {
		  // add cancel code..
		  //alert("cancel");
		},
		buttonClicked: function(index) {
			//alert(index);
			if (index==0)
				$scope.tirarfoto();
			if (index==1)
				$scope.escolherfoto();
			return true;
		}
		/*
		,
		destructiveButtonClicked: function() {
			alert("destructiveButtonClicked");
			return true;
		}
		*/
      });
   };
   
   //
	$scope.tirarfoto = function() {		
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 100,
			targetHeight: 100,
			encodingType: Camera.EncodingType.JPEG,
			mediaType: Camera.MediaType.PICTURE,
			allowEdit: true,
			correctOrientation: true			
			});
	}

	$scope.escolherfoto = function() {		
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			encodingType: Camera.EncodingType.JPEG,
			mediaType: Camera.MediaType.PICTURE,
			allowEdit: true,
			correctOrientation: true			
			});
	}

    function onSuccess(imageURI) {
		alert("imageURI  =  "+imageURI);
		$scope.foto = imageURI;
		cwvars.userimage = imageURI;
		$scope.$apply();
		window.localStorage.setItem("userphoto", imageURI);  
		$rootScope.$emit("updatemenu", {});
		//
		createFileEntry(imageURI);
		//upload(imageURI);
    }

    function onFail(message) {
		$scope.showAlert('Ação cancelada','');
    }   
		   
	$scope.showAlert = function(t,m) {
		var alertPopup = $ionicPopup.alert({
			title: t,
			template: m
		});
		alertPopup.then(function(res) {
			console.log('showAlert');
		});
	};
	
	
	//------------------------------------------------------------------------------
	function upload(fileURL) {
		var uri = encodeURI("http://carloswalter.com/170160290794/testemysql.php");

		var options = new FileUploadOptions();
		options.fileKey  = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1); //"userimage_"+fileURL.substr(fileURL.lastIndexOf('/')+1);
		options.mimeType = "image/png";

		alert("options.fileName = "+options.fileName);
		
		var headers={'headerParam':'headerValue'};

		options.headers = headers;

		var ft = new FileTransfer();
		/*
		ft.onprogress = function(progressEvent) {
			if (progressEvent.lengthComputable) {
			  loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
			} else {
			  loadingStatus.increment();
			}
		};
		*/
		ft.upload(fileURL, uri, win, fail, options);		
	}
    function win(r) {
        alert("Code = " + r.responseCode);
        alert("Response = " + r.response);
        alert("Sent = " + r.bytesSent);
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        alert("upload error source " + error.source);
        alert("upload error target " + error.target);
    }


	//-----------------------------------
	function createFileEntry(imageURI) {
		window.resolveLocalFileSystemURL(imageURI, copyFile, fail);    	// resolve a uri da imagem
	}
	
	function copyFile(fileEntry) {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, 	// resolve o path da área padrão de armazenameto
			function(fileSystem2) {
				$scope.newfilename = "user_"+$scope.dateforfile+".jpg";	// cria arquivo único a cada imagem, relacionando com a ordem na lista
				fileEntry.copyTo( fileSystem2, $scope.newfilename, onCopySuccess, fail);	// copia o conteúdo da uri para o novo arquivo
		  }, fail ); 
	}	
	
	function onCopySuccess(entry) {
		$scope.foto 		= cordova.file.dataDirectory+$scope.newfilename;
		//$scope.dados.image 	= cordova.file.dataDirectory+$scope.newfilename;
		cwvars.userimage = cordova.file.dataDirectory+$scope.newfilename;
		$scope.$apply();	// alimenta a imagem da página e seu registro
		upload(cordova.file.dataDirectory+$scope.newfilename);
	}

	function fail(error) {
		myFactory.aviso('Ocorreu um erro inesperado:',error.code);
	}	
	
	
	
})

/*
    app.controller('listaplace', function($scope, $http) {
        $http({
                method: 'GET',
                url: 'http://strapp.azurewebsites.net/listaplace.cshtml',
                dataType:"json"
        }).then(
            function (response) {
                $scope.content = response.data;
                $scope.result = response.data.results;
                $scope.statuscode = response.status;
                $scope.statustext = response.statusText;   
                $scope.translate = function(text) {
                    return cwconv(text);
                };                
                //
            }
            , function(response) {
                    //Second function handles error
                    $scope.content = "Something went wrong: "+response.status    ;
                }
        );
        
    });
*/
			

//--------------------------------------------------------
    app.controller('coords', function($scope, $http) {
        $http({
                method: 'GET',
                url: 'http://maps.google.com/maps/api/geocode/json?sensor=false&address='+cwvars.endereco+' '+cwvars.cidade+' '+cwvars.uf,
                dataType:"json"
        }).then(
            function (response) {
                $scope.lat = response.data.results.geometry.location.lat;
                $scope.lng = response.data.results.geometry.location.lng;
				alert($scope.lat+'/'+$scope.lng);
                /*
				$scope.content = response.data;
                $scope.result = response.data.results;
                $scope.statuscode = response.status;
                $scope.statustext = response.statusText;   
                $scope.translate = function(text) {
                    return cwconv(text);
                };
				*/
                //
            }
            , function(response) {
                    //Second function handles error
                    //$scope.content = "Ocorreu um erro inesperado: "+response.status    ;
					myFactory.aviso('Ocorreu um erro inesperado:',response.status);
                }
        );
        
    });

		
; //---// 

	/*
	//-------------------------------------------------------------------------------------------------------	
		
		$scope.leuserdata = function() {
			if (window.localStorage.getItem("userdata")) {
				//alert(window.localStorage.getItem('userdata'));
				$scope.data = JSON.parse(window.localStorage.getItem('userdata'));  
			}	
			else
				alert("no localStorage.getItem('userdata')");
		}
		$scope.cadastro = function() {
			$scope.cadshow = true;
		};
		$scope.closecad = function() {
			$scope.cadshow = false;
		}
		$scope.closeesq = function() {
			$scope.esqshow = false;
		}
		
	//	$scope.replacer = function replacer(key, value) {
	//	  if (typeof value === "number") {
	//		return value.toString();
	//	  }
	//	  return value;
	//	};
		
		$scope.doCadastro = function() {
			//alert(JSON.stringify($scope.data));
			window.localStorage.setItem("userdata", JSON.stringify($scope.data)); 
			//alert('gravou userdata');
			$scope.closecad();
		}	
		//
		$scope.shownasc = false;
		$scope.hidetitlenasc = function() {
			$scope.shownasc = true;
		}
		var mytemplate = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';  
		$scope.mymodal = function() {
			$ionicModal.fromTemplateUrl(mytemplate, {scope: $scope}).then(function(modal) {$scope.modal = modal;});
			$scope.modal.show();  
		};
	  //
	*/
