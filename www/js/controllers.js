
angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {

  // modal login
  $scope.loginData = {};
  //
	$scope.cadshow = false;
	$scope.showalert = false;
	$scope.fechamodal = false;
	  $scope.cadastro = function() {
		$scope.cadshow = true;
	  };
	  $scope.closecad = function() {
		  $scope.cadshow = false;
	  }
	  $scope.nada = function () {
		  // nada 
	}
	$scope.fecha = function () {
		$scope.modal.hide();
	}
	var mytemplate = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';  
	$scope.mymodal = function() {
		$ionicModal.fromTemplateUrl(mytemplate, {scope: $scope}).then(function(modal) {$scope.modal = modal;});
		$scope.modal.show();  
  } 
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

  /*
  // submit o form  
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
  };
  */
		 
})

//--------------------------------------------------------------------------------------------------
.controller('detalheurgenteCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory, $ionicHistory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Detalhes do Atendimento";
    $scope.data = {};    
	$scope.host = myhost.url;
	$scope.total = 0.0;
	$scope.texto = "";
	$scope.showAceitar = true;
    
    //
	$scope.inicio = function(status) {
		//$scope.map(); // para urgente mostra o mapa das coords da solicitação via $scope.mapForUrgentPosition()
        
    	//$scope.url = myhost.url+'vetsolicit.php?s='+$stateParams.num;
    	$scope.url = myhost.url+'listaurgente.php?urg='+$stateParams.num;
        console.log($scope.url);
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
            console.log('detalhe urgente:'+JSON.stringify(data));
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(data,'');				
			}
			else {
				// dados locais
				$scope.data = data;
                // mostra o mapa com as coords da solicit urgente
                // chama function em cwmaps.js    
                getMap($scope.data[0].flo_cli_lat, $scope.data[0].flo_cli_long);                
                //$scope.mapForUrgentPosition();
                // soma os valores
				for (i=0; i< $scope.data.length; i++) {
					$scope.total += parseFloat($scope.data[i].flo_ss_preco);
				}					
				//$scope.timedif = Math.abs(new Date($scope.data[0].dt_sol_datahora) - new Date()) / 36e5;
				$scope.timedif = Math.abs(new Date($scope.data[0].datahora) - new Date()) / 36e5;
				$scope.aceitar = Math.floor($scope.timedif).toString()+'h:'+(($scope.timedif % 1)*60).toFixed(0)+'m';
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
	}
	// obtem as coordenadas do endereço de cadastro do cliente
	$scope.map = function() {
		server.coords()
			.success(function(response) {
				//server.callMap(response);
				if (response.status=='ZERO_RESULTS') {
					$scope.disabled = true;
					document.getElementById('map').innerHTML = '<div style="text-align:center; color:red"><br/>O Google Maps não conseguiu localiazar o endereço cadastrado.</div>';
				}
				else {						
					server.callMap(response);
					$scope.load = true;
				}
			})
			.error(function(response) {
				//myFactory.aviso("GoogleMaps demorou muito para responder. ("+response.status+")");		
				if (response.status=='INVALID_REQUEST') {
					myFactory.aviso("Google Maps não localizou o endereço cadastrado",'Verifique e tente novamente.');	
					$scope.disabled = true;
					document.getElementById('map').innerHTML = 'Google Maps não localizou o endereço.<br/>Verifique o endereço cadastrado e tente novamente.';
				}
				else
					myFactory.aviso("Algo saiu errado. ("+response.status+")");		
			})
	};
	
    // mostra as coordenadas recebidas pela solicitação urgente
	$scope.mapForUrgentPosition = function() {
        // chama function em cwmaps.js    
        getMap($scope.data.flo_cli_lat, $scope.data.flo_cli_long);
	};
    //
	$scope.aceita = function(tipo) {
		//$scope.url = myhost.url+'vetaceita.php?s='+$stateParams.num+'&t='+tipo;
    	//$scope.url = myhost.url+'vetaceita.php?s='+$stateParams.num+'&t='+tipo+'&a='+$scope.data[0].int_age_id;
    	$scope.url = myhost.url+'alteraStatusUrgente.php?id='+$stateParams.num+'&vt='+cwvars.userid+'&st=aceito';
        console.log($scope.url);
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
            console.log('aceita -> '+JSON.stringify(data));
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(data,'');				
			}
			else {
				myFactory.aviso(data,'');		
				$ionicHistory.goBack(-1);
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
		
	}
	//
	$scope.tiposerv = function(tipo) {
		switch (tipo) {
			case "1":
				$scope.nomeserv = "Consulta";
				$scope.imgserv = 'img/ico11.png';
				break;
			case "2":
				$scope.nomeserv = "Vacina";
				$scope.imgserv = 'img/ico22.png';
				break;
			case "3":
				$scope.nomeserv = "Curativo";
				$scope.imgserv = 'img/ico33.png';
				break;
			case "4":
				$scope.nomeserv = "Medicamento";
				$scope.imgserv = 'img/ico44.png';
				break;
			case "5":
				$scope.nomeserv = "Exame";
				$scope.imgserv = 'img/ico55.png';
				break; 
		}
		return $scope.imgserv;
	}
	$scope.cor = function(status) {
		if (status==3)
		{
			 //$scope.texto = "Aguardando Aprovação."; 
             $scope.texto = "Aguardando Atendimento."; 
			 $scope.showAceitar = true;
			 return 'ff0000';
		}
		else {
			if (status==4)
			{
				 $scope.texto = "Negada.";
				 $scope.showAceitar = false;
				 return 'ff0000';
			}
    		else
        		if (status==7)
    			{
    				 $scope.texto = "Está aguardando a sua chegada";
    				 $scope.showAceitar = false;
    				 return '00cc00';
    			}
        		else
        			{
        				 $scope.texto = "Confirmado.";
        				 $scope.showAceitar = false;
        				 return '00cc00';
        			}
		}
	}
	$scope.dh = function(datahora) {
		return new Date(datahora);
	}
//	$scope.data = [{'nome':'José Figueiredo','endereco':'Rua Mamoré','cidade':'55/104 - Rio de Janeiro','datahora':'01/09 15:00','valor':'130,00','num':'1','image':'img/MolduraFoto2.jpg','status':false}, {'nome':'Joselito Machado','endereco':'Rua das Flores','cidade':'204 - Rio de Janeiro','datahora':'03/09 18:00','num':'2','image':'img/MolduraFoto2.jpg','status':false}, {'nome':'Antonia Peixoto','endereco':'Av. Copacabana','cidade':'3514 - Rio de Janeiro','datahora':'05/09 14:00','num':'3','image':'img/MolduraFoto2.jpg','status':true}];
})



//--------------------------------------------------------------------------------------------------
.controller('urgentesCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Atendimentos Urgentes";
	$scope.texto = "";
	$scope.host = myhost.url;
	//
	$scope.inicio = function(status) {
		$scope.data = {};    
		$scope.naoha = false;
    	//$scope.url = myhost.url+'vetsolicit.php?i='+cwvars.userid+'&t=3'; // somente solicitações urgentes
        $scope.url = myhost.url+'listaurgente.php?vt='+cwvars.userid+'&st=7'; // solicitações urgentes para este veterinário
    		console.log($scope.url);
		server.send($scope.url).success(function(data) {
			console.log('listaurgente:'+JSON.stringify(data));
            if (data.indexOf('no result')>=0) {
                // este vet não está atendendo nenhuma solicitação urgentes nesse momento
                // então, vamos listar as que esperam atendimento
                $scope.url = myhost.url+'listaurgente.php?vt=all&st=3'; // somente solicitações urgentes mas ainda não aceitas por nenhum veterinario
                	console.log($scope.url);
        		server.send($scope.url).success(function(data) {
        			console.log('listaurgente:'+JSON.stringify(data));
                    // carrega os dados para exibição
                    $scope.data = data;
                    $scope.loading = false;
                    $scope.texto = "Aguardando atendimento";
        		}).error(function(data) {
        				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
        				$scope.loading = false;
        			});                
            }
            else {
                // carrega os dados para exibição
                $scope.data = data;
                $scope.loading = false;
                $scope.texto = "Aguardando atendimento";                
            }
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
	}
    
	$scope.cor = function(status) {
		if (status==3)
		{
			 $scope.texto = "Aguardando Atendimento."; 
			 $scope.showAceitar = true;
			 return 'ff0000';
		}
		else {
    		if (status==4)
			{
				 $scope.texto = "Negada.";
				 $scope.showAceitar = false;
				 return 'ff0000';
			}
			else
        		if (status==7)
    			{
    				 $scope.texto = "Está aguardando a sua chegada";
    				 $scope.showAceitar = false;
    				 return '00cc00';
    			}
        		else
        			{
        				 $scope.texto = "Confirmado.";
        				 $scope.showAceitar = false;
        				 return '00cc00';
        			}
		}	
	}
    
	$scope.dh = function(datahora) {
		//return new Date(datahora);
		var dt = new Date(datahora);
    	//dt.setMonth(dt.getMonth()+1); // arvixe cria a data corretamente na base
    	dt.setHours(dt.getHours()+3);   // diferença fuso arvixe
		return dt;
	}
})


//--------------------------------------------------------------------------------------------------
.controller('transferenciaCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();}); 
	$scope.pagetitle = "Solicitar Transferência";
	$scope.valor = 0;
	$scope.inicio = function() {
		$scope.url = myhost.url+'transf.php?i='+cwvars.userid; // obtém os dados bancários
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				$scope.transf = data;
				$scope.nome = cwvars.username;
				$scope.foto = cwvars.userimage;
				$scope.cpf  = data.str_vet_cpf;
			}			
			}).error(function(data) {
				myFactory.aviso('Não foi possível obter os dados bancários:'+data);
			});				
	};
	$scope.transferir = function() {
		// grava dados
		$scope.url = myhost.url+'transf.php?i='+cwvars.userid+'&ed=1&v='+document.getElementById("val").value;
		//myFactory.aviso($scope.url);
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				myFactory.aviso('Solicitação de transferência enviada. Aguarde confirmação por email');
				myFactory.goHome();
			}			
			}).error(function(data) {
				myFactory.aviso('Não foi possível solicitar a transferência:',data);
			});	
	}
})


//-------------------------------------------------------------------------------------------------------------------
.controller('menuCtrl', function($scope, $stateParams, $ionicPopup, cwvars, $rootScope, myFactory, myhost, server) {
		$scope.$on('$ionicView.enter', function(e) {$scope.home();}); 
		//
		$scope.logout = function() { 
            myFactory.goLogout(); 
        }
        //
		$rootScope.$on("updatemenu", function(){
		   $scope.home();
        });
        //
		$scope.home = function() {
			$scope.nome = cwvars.username;
			$scope.end  = cwvars.userespec+' - '+cwvars.cidade+', '+cwvars.uf;
			$scope.foto = cwvars.userimage;
            if ($state.current.name=='home') {
    			// existem consultas a confirmar?
    			$scope.url = myhost.url+'vetsolicit.php?i='+myFactory.prepareNum(cwvars.userid);
    			server.send($scope.url).success(function(data) {
    					//myFactory.aviso(JSON.stringify(data),'');	
    				if (JSON.stringify(data).indexOf('Não')>=0) {
    					$scope.aconfirmar = false;				
    				}
    				else {
    					var temp = 0;
    					for (i=0; i< data.length; i++) {
    						//myFactory.aviso(data[i].int_status_id,(data[i].int_status_id=='3')+''+(data[i].int_status_id==3));	
    						if (data[i].int_status_id==3)
    							temp++;
    					}
    					if (temp > 0) {
    						$scope.qtde = temp;
    						$scope.aconfirmar = true;				
    					}
    					cwvars.aconfirmar = temp;
    				}			
    				}).error(function(data) {
    					myFactory.aviso('erro menu (existem consultas a confirmar?):',data);
    				});	
            }
			//
			$scope.qtde = cwvars.aconfirmar;
			$scope.aconfirmar = ($scope.qtde>0?true:false);//
		};
})

//--------------------------------------------------------------------------------------------------------------
.controller('homeCtrl', function($scope, $stateParams, $ionicPopup, $state, cwvars, myhost, server, myFactory, $rootScope) {
	
    $scope.$on('$ionicView.beforeEnter', function(e) {
        if (window.localStorage.getItem("logado")==''){
            $state.go('app.entrar');
        }
        else {
            // re-le dados locais
            var data = JSON.parse(window.localStorage.getItem("userdata"));
			cwvars.userid = data.int_vet_id;
			cwvars.username = data.str_vet_nome;
			cwvars.userimage = myhost.url+data.str_vet_image;
			cwvars.userespec = data.espec;
			cwvars.endereco = data.str_vet_address;
			cwvars.cidade= data.str_vet_cidade;
			cwvars.uf= data.str_vet_uf;
        }
    });
    
	$scope.$on('$ionicView.enter', function(e) {$scope.home();});
	$scope.pagetitle = "HOME";
	$scope.aconfirmar = false;
	$scope.qtde = 0;
	//
	$scope.home = function() {
		$scope.aconfirmar = false;
		$scope.qtde = 0;
		$scope.username = cwvars.username;
		$scope.userimage= cwvars.userimage;
		$scope.end = cwvars.userespec+' - '+cwvars.cidade+', '+cwvars.uf;
		
        if ($state.current.name=='home') {
            // existem consultas a confirmar?
    		$scope.url = myhost.url+'vetsolicit.php?i='+myFactory.prepareNum(cwvars.userid);
    		server.send($scope.url).success(function(data) {
    				//myFactory.aviso(JSON.stringify(data),'');	
    			if (JSON.stringify(data).indexOf('Não')>=0) {
    				$scope.aconfirmar = false;				
    			}
    			else {
    				var temp = 0;
    				for (i=0; i< data.length; i++) {
    					//myFactory.aviso(data[i].int_status_id,(data[i].int_status_id=='3')+''+(data[i].int_status_id==3));	
    					if (data[i].int_status_id==3)
    						temp++;
    				}
    				if (temp > 0) {
    					$scope.qtde = temp;
    					$scope.aconfirmar = true;				
    				}
    				cwvars.aconfirmar = temp;
    				$rootScope.$emit("updatemenu", {});
    			}			
    			}).error(function(data) {
    				myFactory.aviso('Não foi possível atualizar as consultas.',data);
    			});	
        }
	}			   
})

//------------------------------------------------------------------------------------------------------------------------
.controller('cadastro3Ctrl', function($scope, $stateParams, myhost, cwvars, server, $state, myFactory, $ionicActionSheet) {  
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.data = {};
	$scope.inicio = function() { 
		$scope.url = myhost.url+'bancos.php';
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('Não')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				$scope.bancos = data;
			}			
			}).error(function(data) {
				myFactory.aviso('Não foi possível obter a relação de bancos:',data);
			});	
	};
	// cadastro 3 - dados bancários
	$scope.finaliza = function() {
		// salva dados bancários 
		$scope.url = myhost.url+'vetcadbancarios.php?i='+cwvars.userid+'&j='+JSON.stringify($scope.data);
		server.send($scope.url).success(function(data) {
			if ((JSON.stringify(data).indexOf('já')>=0)||(JSON.stringify(data).indexOf('rro')>=0)) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				myFactory.aviso('Analisando Pedido','Em breve você receberá uma confirmação do seu cadastro no email cadastrado.');
				myFactory.goLogin();
			}			
	  }).error(function(data) {
			myFactory.aviso('Houve um problema gravando o seu cadastro',data);
	  });				
	}
	
	
})



//------------------------------------------------------------------------------------------------------------------------
.controller('cadastroCtrl', function($scope, $stateParams, myhost, cwvars, server, $state, myFactory, $ionicActionSheet) {  
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Criar Conta";
    $scope.data = {};    
	$scope.id = 0;
	$scope.datetemp = "mm/dd/aaaa";
	$scope.shownasc = false;
	$scope.foto = false;
	//
	$scope.hidetitlenasc = function() {
		$scope.shownasc = true;
	}
	//
	$scope.inicio = function() { 
		$scope.imgfoto = 'img/MolduraFoto2.jpg';
		$scope.dist = 50;
		if (!cwvars.especs.lenght){ //  alimenta CWVARS.especs via ESPEC.PHP 			
			$scope.url = myhost.url+'espec.php';
			server.send($scope.url).success(function(data) {
				if (JSON.stringify(data).indexOf('Não')>=0) {
					myFactory.aviso(JSON.stringify(data),'');				
				}
				else {
					$scope.especs = data; 	
					cwvars.especs = data;
					$scope.myspec = data[0].str_spec_nome;
				}			
				}).error(function(data) {
					myFactory.aviso('Houve um problema lendo as especialidades','Por favor, tente mais tarde.');
				});
		}
		
	};
	// cadastro 2 - documentos
	$scope.salvadocto = function() {
		$state.go('app.cadastro3');
	}
	
	//------------------------- // adapta para o não aceite de datas full format pelo mysql server do cliente
	function setDate(dt) {
			//alert(dt);
		var dt2 = dt.getFullYear().toString(); 
		//var dtm = (dt.getMonth()+1).toString(); // 00 = janeiro
		var dtm = (dt.getMonth()).toString();
		var dtd = dt.getDate().toString();
		if (dtm.length == 1) {dtm = '0'+dtm;}
		if (dtd.length == 1) {dtd = '0'+dtd;}
		/*
		var hh  = (dt.getHours()).toString(); 
		var mm  = dt.getMinutes().toString();
		if (hh.length == 1) {hh = '0'+hh;}
		if (mm.length == 1) {mm = '0'+mm;}
		dt2 += '-'+dtm+'-'+dtd+' '+hh+':'+mm+':00';		
		*/
		dt2 += '-'+dtm+'-'+dtd;		
			//alert(dt2);
		return dt2;
	}	
	
	// cadastro 1 - dados 
	$scope.salva = function() {
		/*
				cwvars.userid = 8;
				//myFactory.upload('vetupload.php?i='+cwvars.userid+'&t='+$scope.tipodoc, cordova.file.dataDirectory+$scope.newfilename, '', 'image', true);
				$state.go('app.cadastro2');
		*/
		var temp = buscajson(cwvars.especs,'str_spec_nome',document.getElementById("spc").value,'int_spec_id'); 
		$scope.data.int_vet_dist = document.getElementById("dist").value;
		$scope.data.int_spec_id = temp;
		// tratamento de data para o server do cliente
		var dt2 = setDate($scope.data.dt_vet_nascimento);
		$scope.data.dt2 = dt2;
		//
		$scope.url = myhost.url+'vetcadastro.php?j='+JSON.stringify($scope.data);
		server.send($scope.url).success(function(data) {
			if ((JSON.stringify(data).indexOf('já')>=0)||(JSON.stringify(data).indexOf('rro')>=0)) { 
				myFactory.aviso(JSON.stringify(data),'');	
			}
			else {
				// armazena  o cod registro retornado
				cwvars.userid = myFactory.prepareNum(data);
				// upload foto, se houver
				if ($scope.newfilename)
					myFactory.upload('vetupload.php?i='+cwvars.userid+'&t='+$scope.tipodoc, cordova.file.dataDirectory+$scope.newfilename, '', 'image', true);
				// vai aos documentos
				$state.go('app.cadastro2');
			}			
		}).error(function(data) {
			myFactory.aviso('Houve um problema gravando o seu cadastro',data);
		});	
	};
	//
    $scope.fotocadastro = function(tipodoc) { 
		$scope.tipodoc = tipodoc;
		$scope.foto = true;
		//
		var myPopup = $ionicActionSheet.show({
			 scope: $scope,
			 buttons: [
				{ text: 'Tirar com a camera' },
				{ text: 'Escolher da galeria' },
			 ],
			titleText: '<h4>Escolher Foto</h4>',
			cancelText: 'Cancelar',
			cssClass: 'social-actionsheet',
			cancel: function() { },
			buttonClicked: function(index) {
				if (index==0)
					$scope.tirarfoto();
				if (index==1)
					$scope.escolherfoto();
				return true;
			}
		});
    };
	//
    $scope.documentos = function(tipodoc) { 
		$scope.tipodoc = tipodoc;
		//
		var myPopup = $ionicActionSheet.show({
			 scope: $scope,
			 buttons: [
				{ text: 'Tirar com a camera' },
				{ text: 'Escolher da galeria' },
			 ],
			titleText: '<h4>'+(tipodoc==1?'Enviar Documento':'Enviar Diploma')+'</h4>',
			cancelText: 'Cancelar',
			cssClass: 'social-actionsheet',
			cancel: function() { },
			buttonClicked: function(index) {
				if (index==0)
					$scope.tirarfoto();
				if (index==1)
					$scope.escolherfoto();
				return true;
			}
		});
    };
	//
	$scope.tirarfoto = function() {		
		if ($scope.foto) {
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
		else {			
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				encodingType: Camera.EncodingType.JPEG,
				mediaType: Camera.MediaType.PICTURE,
				allowEdit: true,
				correctOrientation: true
				});
		}
	}
	//
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
	//
    function onSuccess(imageURI) {
		cwvars.userimage = imageURI;
		$scope.imgfoto = imageURI;
		$scope.$apply();
		createFileEntry(imageURI);
    }
	//
    function onFail(message) {
		myFactory.aviso('Ação cancelada','');
    }   
	function createFileEntry(imageURI) {
		imageURI = myFactory.checkfile(imageURI);
		window.resolveLocalFileSystemURL(imageURI, copyFile, fail);    	
	}
	//
	function copyFile(fileEntry) {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, 	
			function(fileSystem2) {
				if ($scope.foto) {
					$scope.newfilename = 'cad_'+Math.round(+new Date()/1000).toString()+'.jpg';
				}
				else {
					$scope.newfilename = 'user_'+cwvars.userid+'_docto_'+Math.round(+new Date()/1000).toString()+'.jpg';					
				}
				fileEntry.copyTo( fileSystem2, $scope.newfilename, onCopySuccess, fail);
		  }, fail ); 
	}	
	// documento
	function onCopySuccess(entry) {
		if (!$scope.foto) { // foto cadastro upload só após receber o id
			myFactory.upload('vetuploaddocto.php?i='+cwvars.userid+'&t='+$scope.tipodoc, cordova.file.dataDirectory+$scope.newfilename, '', 'image', true);			
		}
	}	
	//
    function fail(error) {
		myFactory.aviso('Ocorreu um erro inesperado!',error.code+'/'+error.source+'/'+error.target);
    }	
})


//---------------------------------------------------------------------------------------------- 
.controller('pendentesCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Atendimentos Pendentes";
	$scope.texto = "";
	$scope.host = myhost.url;
	//
	$scope.inicio = function(status) {
		$scope.data = {};    
		$scope.naoha = false;
		$scope.url = myhost.url+'vetsolicit.php?i='+cwvars.userid+'&t=3'; // somente solicitações pendentes
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('há')>=0) {
				myFactory.aviso(JSON.stringify(data),'');
				$scope.naoha = true;
				myFactory.goHome();
			}
			else {
				// salva dados locais
				$scope.data = data;
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
		
	}
	$scope.cor = function(status) {
		if (status==3)
		{
			 $scope.texto = "Aguardando Aprovação."; 
			 $scope.showAceitar = true;
			 return 'ff0000';
		}
		else {
			if (status==4)
			{
				 $scope.texto = "Negada.";
				 $scope.showAceitar = false;
				 return 'ff0000';
			}
			else
			{
				 $scope.texto = "Confirmado.";
				 $scope.showAceitar = false;
				 return '00cc00';
			}
		}	
	}
	$scope.dh = function(datahora) {
		//return new Date(datahora);
		var dt = new Date(datahora);
		dt.setMonth(dt.getMonth()+1);
		return dt;
	}
})


//----------------------------------------------------------------------------------------------------------------------------------
.controller('calendarCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory, $ionicPopup, $ionicSideMenuDelegate, $ionicNavBarDelegate) {
	$ionicSideMenuDelegate.canDragContent(false);
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.$on('$ionicView.beforeLeave', function(e) {
		$scope.salvar(false);
	});
	
	$scope.pagetitle = "Agenda";
	$scope.loading = false;
	$scope.classuma = 'blue';
	$scope.classrep = 'lightgray'; 
	$scope.repetir = false;
	$scope.btmes = true;
	$scope.bticon = ''; 
	$scope.apagar = false;
	$scope.btdisabled = true;
	$scope.altura = 90;
	
	$scope.haAlteracao = function(estado) {
		//$ionicNavBarDelegate.showBackButton(!estado);
		$scope.btdisabled = !estado;
		//alert('haAlteracao:'+estado);
	}
	
	$scope.refresh = function() {
		$scope.inicio(false);
	}
	
	
	//
	$scope.inicio = function() {
		$scope.bticon = 'ion-ios-list'; // para ir ao semanal
		// carregue do banco a agenda do ver e atualiza como abaixo
		$scope.url = myhost.url+'vetagenda.php?i='+cwvars.userid;
		//myFactory.aviso($scope.url);
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('há')>=0) {
				myFactory.aviso(JSON.stringify(data),'');	
				var events = [];	
				$scope.calendar.eventSource = events;				
			}
			else {
				// salva dados locais
				//myFactory.aviso('dados',JSON.stringify(data));
				var myevents = [];
				for (i=0; i < data.length; i++) {
					var ini = new Date(data[i].dt_age_inicio);
					var fim = new Date(data[i].dt_age_fim);
					myevents.push({
						title: 		data[i].str_age_title,
						startTime: 	new Date(ini.getFullYear(), ini.getMonth(), ini.getDate(), ini.getHours(), ini.getMinutes()),
						endTime: 	new Date(fim.getFullYear(), fim.getMonth(), fim.getDate(), fim.getHours(), fim.getMinutes()),
						allDay: 	false,
						tipo: 		data[i].str_age_tipo,
						cor: 		data[i].str_age_cor,
						hide: 		'x7',
						conf: 		data[i].str_age_conf,
						id: 		data[i].int_age_id
					});	
				}
				$scope.calendar.eventSource = myevents;
				$scope.changeMode('month');
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
	};
	
	//------------------------- // adapta para o não aceite de datas full format pelo mysql server do cliente
	function setDate(dt) {
		//alert(dt);
		var dt2 = dt.getFullYear().toString(); 
		var dtm = (dt.getMonth()+1).toString(); // 00 = janeiro
		var dtd = dt.getDate().toString();
		//var hh  = (dt.getHours()-2).toString(); // corrige fuso horário gmt+2 - server do cliente
		var hh  = (dt.getHours()).toString(); 
		var mm  = dt.getMinutes().toString();
		if (dtm.length == 1) {dtm = '0'+dtm;}
		if (dtd.length == 1) {dtd = '0'+dtd;}
		if (hh.length == 1) {hh = '0'+hh;}
		if (mm.length == 1) {mm = '0'+mm;}
		dt2 += '-'+dtm+'-'+dtd+' '+hh+':'+mm+':00';		
		//alert(dt2);
		return dt2;
	}	
	
	//--------------------------------
	$scope.salvar = function(voltar) {
		var agenda = $scope.calendar.eventSource;  
		// inclui os novos ----------------------
		var temp = JSON.parse('{"data":[{"title":"x7y8", "startTime":"", "endTime":"", "allDay":"", "tipo":"", "cor":"", "hide":"", "conf":"", "id":""} ]}');
		var indice = 0;
		for (i=0; i < agenda.length; i++) {
			//if (agenda[i].id == 0) {	
			if ((agenda[i].id == 0)&&(agenda[i].tipo != 'x')) {	// inclui apenas os novos não excluídos
				temp.data[indice] = agenda[i];
				var ini = new Date(agenda[i].startTime);
				var fim = new Date(agenda[i].endTime);
				/*
					// corrige fuso horário gmt+3
					temp.data[indice].startTime = new Date(ini.getFullYear(), ini.getMonth(), ini.getDate(), ini.getHours() - 3, ini.getMinutes());
					temp.data[indice].endTime   = new Date(fim.getFullYear(), fim.getMonth(), fim.getDate(), fim.getHours() - 3, fim.getMinutes());
				*/
				// adapta para o não aceite de datas full format pelo mysql server do cliente
				temp.data[indice].startTime = setDate(ini);
				temp.data[indice].endTime   = setDate(fim);
				indice++;
			}
		}				
		// se tem novos
		if (indice > 0) { 
			$scope.url = myhost.url+'vetagenda.php?i='+cwvars.userid+'&t=1';
			//myFactory.aviso($scope.url);
				//myFactory.aviso('novos',indice);
		//alert(temp)	;
			server.post($scope.url,temp).success(function(data) {
				$scope.loading = false;
				if (JSON.stringify(data).indexOf('rro')>=0) {
					myFactory.aviso(JSON.stringify(data),'');				
				}
				else {
					//
					//myFactory.aviso('dados',JSON.stringify(data));
				}			
				}).error(function(data) {
					myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
					$scope.loading = false;
				});
		}
		// apaga os excluídos
		var temp2 = JSON.parse('{"data":[{"title":"", "startTime":"", "endTime":"", "allDay":"", "tipo":"", "cor":"", "hide":"", "conf":"","id":""} ]}');
		indice = 0;
		for (i=0; i < agenda.length; i++) {
			//if (agenda[i].tipo == 'x') {	
			if ((agenda[i].tipo == 'x')&&(agenda[i].id != 0)) {	// só apaga os já existentes anteriormente
				temp2.data[indice] = agenda[i];
				indice++;
				//alert('vai apagar o '+agenda[i].id);
			}
			else {
				//myFactory.aviso('nao apagou '+agenda[i].title,agenda[i].id+' '+agenda[i].tipo);				
			}
		}		
			//alert('indice='+indice+' temp2.data.length = '+temp2.data.length);
		// se tem excluídos
		if (indice > 0) { 
			$scope.url = myhost.url+'vetagenda.php?i='+cwvars.userid+'&t=2';
			//myFactory.aviso($scope.url);
			server.post($scope.url,temp2).success(function(data) {
				$scope.loading = false;
				if (JSON.stringify(data).indexOf('rro')>=0) {
					myFactory.aviso(JSON.stringify(data),'');				
				}
				else {
					//
					//myFactory.aviso('dados',JSON.stringify(data));
				}			
				}).error(function(data) {
					myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
					$scope.loading = false;
				});
		}
		$scope.haAlteracao(false);
		//$scope.bticon = 'ion-ios-list'; // para ir ao semanal
		if (voltar)
			$scope.inicio();
		 
	}; 
	
	//--------------- alterna a exibição   
	$scope.btcalendar = function() { 
		$scope.btmes = !$scope.btmes; // altena o modo de agenda
		if ($scope.btmes) { // agenda mudou para mensal
			$scope.altura = 92;
			if (!$scope.btdisabled) { // exitem alterações a salvar
					// avisa para salvar
					var myPopup = $ionicPopup.show({
						title: 'Deseja salvar as alterações?',
						template: '',
						scope: $scope,
						buttons: [
							{ text: 'Não' }, 
							{ text: '<b>Sim</b>', 
							  type: 'button-positive',
									onTap: function(e) {
										return true; 
									}
							}
						]
					});
					myPopup.then(function(res) {
						if(res) {
							//$scope.salvar();
							$scope.salvar(true);
						}
						else {
							$scope.haAlteracao(false);
							$scope.bticon = 'ion-ios-list'; // para ir ao semanal
							$scope.inicio();
						}
					})
			}
			else {				
				//$scope.btdisabled = true;
				$scope.haAlteracao(false);
				$scope.bticon = 'ion-ios-list'; // para ir ao semanal
				//$scope.changeMode('month');
				$scope.inicio();
			}
		}
		else {
			$scope.bticon = 'ion-calendar'; // para ir ao mensal
			$scope.altura = 70;
			$scope.changeMode('week');
		}	
	}
	
	//-------------- único ou repetir
	$scope.tipomarca = function(tipo) {
		if (tipo==0) {
			$scope.classuma = 'blue';
			$scope.classrep = 'lightgray';
			$scope.repetir = false;
		}
		else {
			$scope.classuma = 'lightgray';
			$scope.classrep = 'orangecustom';//'green2';
			$scope.repetir = true;
		}
	}	
	//-------------------- user clicou em evento existente
	$scope.onEventSelected = function (event) { 
		if (!$scope.btmes) {
			var pos = -1;
			var myevents = [];
			myevents = $scope.calendar.eventSource; 
			// localiza o evento
			for (i=0; i < myevents.length; i++) {
				if (myevents[i].startTime == event.startTime) { 
					pos = i;
					break;
				}
			}
			if (pos >-1) { // o evento já existe
				if ($scope.calendar.eventSource[pos].tipo == 'x') { // previamente apagado, retorna ao primeiro estágio 
					myevents[pos].cor = ($scope.repetir?'fba919':'3a87ad');
					myevents[pos].tipo= ($scope.repetir?'r':'u');
					myevents[pos].hide= 'x7'; 
					// se for recorrente, cria eventos futuros por 11 semanas
					if ($scope.repetir) {
						var startTime = event.startTime;
						for (i=0; i < 11; i++) {
							// mais uma semana
							startTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate() + 7, startTime.getHours(), startTime.getMinutes());
							// mais uma hora
							endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + 1, startTime.getMinutes());
							// localiza o evento
							pos = -1;
							for (j=0; j < myevents.length; j++) {
								if (myevents[j].startTime.toString() == startTime.toString()) {
									pos = j;
									break;
								}
							}
							if (pos >-1) {
								myevents[pos].cor = ($scope.repetir?'fba919':'3a87ad');
								myevents[pos].tipo= ($scope.repetir?'r':'u');
								myevents[pos].hide= 'x7'; 
							}
							else {
								// inclui
								myevents.push({ 
									title: 'horário livre',
									startTime: startTime,
									endTime: endTime,
									allDay: false ,
									tipo: ($scope.repetir?'r':'u'),
									cor: ($scope.repetir?'fba919':'3a87ad'), 
									hide: 'x7',
									conf: 'nao',
									id: 0
								});											
							}
						}
					}
					//
					$scope.$broadcast('eventSourceChanged',myevents);
					//$scope.btdisabled = false; // habilita botao salvar
					$scope.haAlteracao(true);
				}
				else {
					if ($scope.calendar.eventSource[pos].conf=='nao') { 	// não há consulta marcada para esta data
						// armazena o tipo atual
						var tipo = $scope.calendar.eventSource[pos].tipo; // para exclusão em massa se for = 'r'
								//alert('tipo='+tipo);
						// confirma antes de apagar
						var days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
						var day = days[ event.startTime.getDay() ];
						//var t = ($scope.repetir?'Apagar este horário recorrente?':'Apagar este horário?')
						//var m = ($scope.repetir?'Isto apagará todos os horários futuros de '+day+' de '+event.startTime.getHours()+'hs às '+event.endTime.getHours()+'hs.':'')
						var t = ($scope.calendar.eventSource[pos].tipo=='r'?'Apagar este horário recorrente?':'Apagar este horário?')
						var m = ($scope.calendar.eventSource[pos].tipo=='r'?'Isto apagará todos os horários futuros de '+day+' de '+event.startTime.getHours()+'hs às '+event.endTime.getHours()+'hs.':'')
						var myPopup = $ionicPopup.show({
							title: t,
							template: m,
							scope: $scope,
							buttons: [
								{ text: 'Cancelar' }, {
									text: '<b>Apagar</b>', 
									type: 'button-positive',
										onTap: function(e) {
											return true; 
										}
								}
							]
						});
						myPopup.then(function(res) {
							if(res) {
								var temp = myevents[pos].startTime;
								if (new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), 23, 59) < new Date()) {
									myFactory.aviso('Data anterior à atual!','');
								}
								else {
									// apaga o atual
									myevents[pos].cor = 'ffffff'; // cor igual ao fundo e fonte na displayEvent.html simula invisibilidade, na monthviewEventDetail oculta pelo | filter:'no'
									myevents[pos].tipo = 'x'; 
									myevents[pos].hide = 'yes'; 
									// se for recorrente, tenta apagar eventos futuros por 11 semanas
									//if ($scope.repetir) {
									if (tipo='r') {
										var startTime = myevents[pos].startTime; // data inicial do evento selecionado
										for (i=0; i < 11; i++) {
											// mais uma semana
											startTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate() + 7, startTime.getHours(), startTime.getMinutes());
											// localiza o evento
											pos = -1;
											for (j=0; j < myevents.length; j++) {
												if (myevents[j].startTime.toString() == startTime.toString()) {
													pos = j;
													break;
												}
											}
											if (pos >-1) {
												myevents[pos].cor = 'ffffff';
												myevents[pos].tipo = 'x'; 
												myevents[pos].hide = 'yes'; 
												//alert('poz x no '+myevents[pos].id);
											}
										}
									}
									$scope.$broadcast('eventSourceChanged',myevents);
									//$scope.btdisabled = false; // habilita botao salvar
									$scope.haAlteracao(true);
										
								}
							} 
							
						});    					
					}
					else {
						myFactory.aviso('Existe compromisso para esta data!','');
					}
				}	
			}
		}
	};
	
	
	//-------------------------- user clicou em espaço em branco para criar novo evento
	$scope.$on('marca-desmarca', function(event, args) {
		var temp = args.args.hora;
		if (new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(),23, 59) < new Date()) {
			myFactory.aviso('Data anterior à atual!','');
		}
		else {
			startTime = args.args.hora;
			// adiciona 1 hora
			endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + 1, startTime.getMinutes());
			var myevents = [];
			// recebe o atual
			if ($scope.calendar.eventSource)
				myevents = $scope.calendar.eventSource; 
			// incrementa o array de eventos
			myevents.push({ 
				title: 'horário livre',
				startTime: startTime,
				endTime: endTime,
				allDay: false ,
				tipo: ($scope.repetir?'r':'u'),
				cor: ($scope.repetir?'fba919':'3a87ad'), // cor do fundo do evento a ser exibido em templates/rcalendar/displayEvent.html
				hide: 'x7',
				conf: 'nao',
				id: 0
			});	
			//alert('marca-desmarca:'+args.args.hora);
			// se for recorrente, cria eventos futuros por 11 semanas
			if ($scope.repetir) {
				for (i=0; i < 11; i++) {
					// mais uma semana
					startTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate() + 7, startTime.getHours(), startTime.getMinutes());
					// mais uma hora
					endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + 1, startTime.getMinutes());
					// inclui
					myevents.push({ 
						title: 'horário livre',
						startTime: startTime,
						endTime: endTime,
						allDay: false ,
						tipo: ($scope.repetir?'r':'u'),
						cor: ($scope.repetir?'fba919':'3a87ad'), 
						hide: 'x7',
						conf: 'nao',
						id: 0
					});				
				}
			}
			// substitui o eventSource anterior e alerta da mudança para que ocorra o refresh da tela - $scope.$broadcast('eventSourceChanged',$scope.eventSource);
			if ($scope.calendar.eventSource)
				$scope.$broadcast('eventSourceChanged',myevents);
			else
				$scope.calendar.eventSource = myevents;	
			//
			//$scope.btdisabled = false; // habilita botao salvar
			$scope.haAlteracao(true);
		}	
	});	

	
	
	
	
	/*
	// apenas para testes, enquanto não há a leitura do banco
	$scope.novo = function() {
		var events = [];
		startTime = new Date(2016, 8, 7, 8, 0); // jan = 0
		endTime = new Date(2016, 8, 7, 9, 0);
		events.push({
			title: 'Evento novo',
			startTime: startTime,
			endTime: endTime,
			allDay: false,
			tipo: 'unico', 
			cor: '3a87ad',
			hide: 'no'
		});			
		$scope.calendar.eventSource = events;
	}
	*/
	
	// funções herdadas do plugin
	$scope.calendar = {};
	//
	$scope.changeMode = function (mode) {
		if (mode=='week')
			$scope.weekview = true;
		else
			$scope.weekview = false;
		//
		$scope.calendar.mode = mode;
	};
	//
	$scope.loadEvents = function () {
		$scope.calendar.eventSource = createRandomEvents();
		//$scope.calendar.eventSource = novo();
		//alert($scope.calendar.eventSource[0].title+' / '+$scope.calendar.eventSource[0].startTime+' / '+$scope.calendar.eventSource[0].endTime+' / '+$scope.calendar.eventSource[0].allDay+' / '+$scope.calendar.eventSource[0].tipo);
	};
	//
	$scope.onViewTitleChanged = function (title) {
		$scope.viewTitle = title;
	};
	//
	$scope.today = function () {
		$scope.calendar.currentDate = new Date();
	};
	//
	$scope.isToday = function () {
		var today = new Date(),
			currentCalendarDate = new Date($scope.calendar.currentDate);

		today.setHours(0, 0, 0, 0);
		currentCalendarDate.setHours(0, 0, 0, 0);
		return today.getTime() === currentCalendarDate.getTime();
	};
	//
	$scope.onTimeSelected = function (selectedTime, events) {
		console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
	};
	// para preenchimento de testes
	function createRandomEvents() {
		var events = [];
		for (var i = 0; i < 3; i += 1) {
			var date = new Date();
			var eventType = Math.floor(Math.random() * 2);
			var startDay = Math.floor(Math.random() * 90) - 45;
			var endDay = Math.floor(Math.random() * 2) + startDay;
			var startTime;
			var endTime;
			if (eventType === 0) {
				startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
				if (endDay === startDay) {
					endDay += 1;
				}
				endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
				events.push({
					title: 'All Day - ' + i,
					startTime: startTime,
					endTime: endTime,
					allDay: true
				});
			} else {
				var startMinute = Math.floor(Math.random() * 24 * 60);
				var endMinute = Math.floor(Math.random() * 180) + startMinute;
				startTime = new Date(
				date.getFullYear(), 
				date.getMonth(), 
				date.getDate() + startDay, 
				0, 
				date.getMinutes() + startMinute);
				endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
				//alert(date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate());
				events.push({
					title: 'Event - ' + i,
					startTime: startTime,
					endTime: endTime,
					allDay: false
				});
			}
		}
		/*
		startTime = new Date(2016, 9, 7, 13, 30);
		endTime = new Date(2016, 9, 7, 14, 30);
		events.push({
			title: 'Evento novo',
			startTime: startTime,
			endTime: endTime,
			allDay: false
		});	
		*/
		return events;
	}	
	
	
})

//----------------------------------------------------------------------------------------------
.controller('financCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Relatório Financeiro";
	$scope.loading = false;
	$scope.inicio = function() {
		$scope.valtotal = 0.0;
		// barras - 12 meses
		$scope.url = myhost.url+'relfin.php?i='+cwvars.userid;
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				// salva dados locais
				$scope.data = data;
				$scope.valtotal = data[0].tot30;
				var valores = [0,0,0,0,0,0,0,0,0,0,0,0];
				for (i=0; i<data.length; i++) {
					valores[data[i].mes-1] = data[i].total;
				}
				bar(valores);
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
		// pie - 30 dias
		$scope.url = myhost.url+'relfin.php?t=1&i='+cwvars.userid;
		server.send($scope.url).success(function(data) {
					//myFactory.aviso(JSON.stringify(data),'');
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(JSON.stringify(data),'');
			}
			else {
				var valores = [];
				for (i=0; i<5; i++) {
					// exibe os valores no destaque tocando/sobrepondo o gráfico
					//valores[data[i].tipo-1] = data[i].valor;
					// exibe a % em relação ao total  no destaque tocando/sobrepondo o gráfico
					if (data[i])
						valores[data[i].tipo-1] = ((data[i].valor/$scope. valtotal)*100).toFixed(2);
					else
						valores[i] = '0.00';
				}
				//alert(valores);
				pie(valores);
				
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
	}
})


//----------------------------------------------------------------------------------------------
.controller('arealizarCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Atendimentos a realizar";
    $scope.data = {};    
	$scope.texto = "";
	$scope.naoha = false;
	$scope.host = myhost.url;
	$scope.inicio = function(status) {
		$scope.url = myhost.url+'vetsolicit.php?i='+cwvars.userid+'&t=1'; // somente solciitações aceitas
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('há')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
				$scope.naoha = true;
				myFactory.goHome();
}
			else {
				// salva dados locais
				$scope.data = data;
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
		
	}
	$scope.cor = function(status) {
		if (status==3)
		{
			 $scope.texto = "Aguardando Aprovação."; 
			 $scope.showAceitar = true;
			 return 'ff0000';
		}
		else {
			if (status==4)
			{
				 $scope.texto = "Negada.";
				 $scope.showAceitar = false;
				 return 'ff0000';
			}
			else
			{
				 $scope.texto = "Confirmado.";
				 $scope.showAceitar = false;
				 return '00cc00';
			}
		}	
	}
	$scope.dh = function(datahora) {
		return new Date(datahora);
	}
})

//-------------------------------------------------------------------------------------------
.controller('clienteCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Clientes";
    $scope.data = {};    
	$scope.texto = "";
	$scope.host = myhost.url;
	$scope.inicio = function(status) {
		$scope.url = myhost.url+'vetsolicit.php?i='+cwvars.userid;
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
        		if (JSON.stringify(data).indexOf('Não há')>=0) {
    				myFactory.aviso(JSON.stringify(data),'');				
    			}
                else 
                {
    				// salva dados locais 
    				$scope.data = data;
                }
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
		
	}
	$scope.cor = function(status) {
		if (status==3)
		{
			 $scope.texto = "Aguardando Aprovação."; 
			 $scope.showAceitar = true;
			 return 'ff0000';
		}
		else {
			if (status==4)
			{
				 $scope.texto = "Negada.";
				 $scope.showAceitar = false;
				 return 'ff0000';
			}
			else
			{
				 $scope.texto = "Confirmado.";
				 $scope.showAceitar = false;
				 return '00cc00';
			}
		}	
	}
	$scope.dh = function(datahora) {
		return new Date(datahora);
	}
	
	
	//$scope.data = [{'nome':'José Figueiredo','endereco':'Rua Mamoré','cidade':'55/104 - Rio de Janeiro','datahora':'01/09 15:00','valor':'130,00','num':'1','image':'img/MolduraFoto2.jpg','status':false}, {'nome':'Joselito Machado','endereco':'Rua das Flores','cidade':'204 - Rio de Janeiro','datahora':'03/09 18:00','num':'2','image':'img/MolduraFoto2.jpg','status':false}, {'nome':'Antonia Peixoto','endereco':'Av. Copacabana','cidade':'3514 - Rio de Janeiro','datahora':'05/09 14:00','num':'3','image':'img/MolduraFoto2.jpg','status':true}];
})



//--------------------------------------------------------------------------------------------------------------------
.controller('detalhesConsultaCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory, $ionicHistory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Detalhes da Consulta";
    $scope.data = {};    
	$scope.host = myhost.url;
	$scope.total = 0.0;
	$scope.texto = "";
	$scope.showAceitar = true;
	$scope.inicio = function(status) {
		$scope.map();
		$scope.url = myhost.url+'vetsolicit.php?s='+$stateParams.num;
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(data,'');				
			}
			else {
				// salva dados locais
					//myFactory.aviso(JSON.stringify(data),'');	
				$scope.data = data;
					//myFactory.aviso($scope.data[0].int_age_id,'');	  
				for (i=0; i< $scope.data.length; i++) {
					$scope.total += parseFloat($scope.data[i].flo_ss_preco);
				}					
				//$scope.timedif = Math.abs(new Date($scope.data[0].dt_sol_datahora) - new Date()) / 36e5;
				$scope.timedif = Math.abs(new Date($scope.data[0].datahora) - new Date()) / 36e5;
				$scope.aceitar = Math.floor($scope.timedif).toString()+'h:'+(($scope.timedif % 1)*60).toFixed(0)+'m';
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
	}
	//
	$scope.map = function() {
		server.coords()
			.success(function(response) {
				//server.callMap(response);
				if (response.status=='ZERO_RESULTS') {
					$scope.disabled = true;
					document.getElementById('map').innerHTML = '<div style="text-align:center; color:red"><br/>O Google Maps não conseguiu localiazar o endereço cadastrado.</div>';
				}
				else {						
					server.callMap(response);
					$scope.load = true;
				}
			})
			.error(function(response) {
				//myFactory.aviso("GoogleMaps demorou muito para responder. ("+response.status+")");		
				if (response.status=='INVALID_REQUEST') {
					myFactory.aviso("Google Maps não localizou o endereço cadastrado",'Verifique e tente novamente.');	
					$scope.disabled = true;
					document.getElementById('map').innerHTML = 'Google Maps não localizou o endereço.<br/>Verifique o endereço cadastrado e tente novamente.';
				}
				else
					myFactory.aviso("Algo saiu errado. ("+response.status+")");		
			})
	};
	//
	$scope.aceita = function(tipo) {
		//$scope.url = myhost.url+'vetaceita.php?s='+$stateParams.num+'&t='+tipo;
		$scope.url = myhost.url+'vetaceita.php?s='+$stateParams.num+'&t='+tipo+'&a='+$scope.data[0].int_age_id;
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('rro')>=0) {
				myFactory.aviso(data,'');				
			}
			else {
				myFactory.aviso(data,'');		
				$ionicHistory.goBack(-1);
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
		
	}
	//
	$scope.tiposerv = function(tipo) {
		switch (tipo) {
			case "1":
				$scope.nomeserv = "Consulta";
				$scope.imgserv = 'img/ico11.png';
				break;
			case "2":
				$scope.nomeserv = "Vacina";
				$scope.imgserv = 'img/ico22.png';
				break;
			case "3":
				$scope.nomeserv = "Curativo";
				$scope.imgserv = 'img/ico33.png';
				break;
			case "4":
				$scope.nomeserv = "Medicamento";
				$scope.imgserv = 'img/ico44.png';
				break;
			case "5":
				$scope.nomeserv = "Exame";
				$scope.imgserv = 'img/ico55.png';
				break; 
		}
		return $scope.imgserv;
	}
	$scope.cor = function(status) {
		if (status==3)
		{
    		 //$scope.texto = "Aguardando Aprovação."; 
    		 $scope.texto = "Aguardando Atendimento."; 
			 $scope.showAceitar = true;
			 return 'ff0000';
		}
		else {
			if (status==4)
			{
				 $scope.texto = "Negada.";
				 $scope.showAceitar = false;
				 return 'ff0000';
			}
			else
			{
				 $scope.texto = "Confirmado.";
				 $scope.showAceitar = false;
				 return '00cc00';
			}
		}	
	}
	$scope.dh = function(datahora) {
		return new Date(datahora);
	}
//	$scope.data = [{'nome':'José Figueiredo','endereco':'Rua Mamoré','cidade':'55/104 - Rio de Janeiro','datahora':'01/09 15:00','valor':'130,00','num':'1','image':'img/MolduraFoto2.jpg','status':false}, {'nome':'Joselito Machado','endereco':'Rua das Flores','cidade':'204 - Rio de Janeiro','datahora':'03/09 18:00','num':'2','image':'img/MolduraFoto2.jpg','status':false}, {'nome':'Antonia Peixoto','endereco':'Av. Copacabana','cidade':'3514 - Rio de Janeiro','datahora':'05/09 14:00','num':'3','image':'img/MolduraFoto2.jpg','status':true}];
})



//------------------------------------------------------------------------------------
.controller('entrarCtrl', function($scope, $stateParams, $ionicPopup, myFactory, cwvars, myhost, server, $rootScope, $ionicSideMenuDelegate) {
    $scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
    
	$ionicSideMenuDelegate.canDragContent(false);
	$scope.pagetitle = "Entrar";
	$scope.loading = false;
	
    $scope.inicio = function() {
        if (window.localStorage.getItem("logado")) {
            if (window.localStorage.getItem("logado") != '') {
    			$scope.lespecs();
				myFactory.goHome();
            }
        }
    }
    
    
    //
	$scope.doLogin = function()
	{
		$scope.loading = true;
		$scope.url = myhost.url+'vetlogin.php?j='+JSON.stringify($scope.loginData);
		server.send($scope.url).success(function(data) {
			$scope.loading = false;
			if (JSON.stringify(data).indexOf('inválida')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				// salva dados locais
				cwvars.userid = data.int_vet_id;
				cwvars.username = data.str_vet_nome;
				cwvars.userimage = myhost.url+data.str_vet_image;
				cwvars.userespec = data.espec;
				cwvars.endereco = data.str_vet_address;
				cwvars.cidade= data.str_vet_cidade;
				cwvars.uf= data.str_vet_uf;
                //
                window.localStorage.setItem("userdata", JSON.stringify(data));
                window.localStorage.setItem("logado", cwvars.userid);  
                //
				$rootScope.$emit("updatemenu", {});
				$scope.lespecs();
				myFactory.goHome();
			}			
			}).error(function(data) {
				myFactory.aviso('Houve problemas conectando o servidor. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
				$scope.loading = false;
			});
		
	};	
	$scope.lespecs = function() { //  CWVARS.especs via ESPEC.PHP
		$scope.url = myhost.url+'espec.php';
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('Não')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				// salva dados locais
				cwvars.especs = data;
			}			
			}).error(function(data) {
				myFactory.aviso('O servidor demorou para responder ','Por favor, tente mais tarde.');
			});
		
	};
	//
	$scope.esqueci = function() {
	   var myPopup = $ionicPopup.show({
		 title: 'Recuperação de Senha',
		 subTitle: 'Insira o email cadastrado',
		 template: '<input type="text" placeholder="Insira o e-mail cadastrado" ng-model="loginData.email">',
		 scope: $scope,
		 buttons: [
		   { text: 'Cancelar' },
		   {
			 text: '<b>Enviar</b>',
			 type: 'button-positive',
			 onTap: function(e) {
			   if (!$scope.loginData.email) {
					e.preventDefault();
			   } else {
					return $scope.loginData.email;
			   }
			 }
		   },
		 ]
	   });
	   myPopup.then(function(res) {
		if (res!=undefined) {
			$scope.url = myhost.url+'esqueci.php?e='+res;
			server.send($scope.url)
                .success(function(data) {
				    myFactory.aviso(data,'');
		        }).error(function(data) {
				    myFactory.aviso('Não foi possível enviar a sua solicitação:',data);
		        });
		}
	   });   	   
	}
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
			 console.log('Tapped!', res);
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
			   title: 'D?vida cruel',
			   template: 'Por que disable o moal atr? de mim?'
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
		

.controller('animaisCtrl', function($scope, $stateParams, $state) {
	$scope.pagetitle = "Animais";
	$scope.cadanimal = function() {
		$state.go('app.cadanimal');
	};
	$scope.data = [{'nome':'Billy','tipo':'Cão','raca':'Labrador','num':'1','image':'img/CaesIcone.jpg'}];
})

.controller('cadanimalCtrl', function($scope, $stateParams) {
	$scope.pagetitle = "Animal"+$stateParams.num+($stateParams.num==""?'= a \"\"':'ok');
	$scope.pagetitle = ($stateParams.num==""?'Cadastrar Animal':'Animal');
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
	$scope.data = [{'num':1, 'nome':'Acupuntura Veterinária','desc':'descrição da especialidade'},{'num':2, 'nome':'Anestesiologia Veterinária','desc':'descrição da especialidade'},{'num':3, 'nome':'Bem Estar e Comportamento Animal','desc':'descrição da especialidade'}];
	switch($stateParams.tipo) {
		case "consulta":
		$scope.pagetitle = "Consultas";
		cwvars.codserv = 1;
		break;
	}	
})

//-------------------------------------------------------------------------------------------
.controller('atendCtrl', function($scope, $stateParams, $ionicPopup, $state, $ionicHistory) { 
	$scope.pagetitle = "Localização do Atendimento";//$stateParams.tipo+$stateParams.num;
	$scope.data = [{'end':'Rua Comendador Martinelli, 38','end2':'Glória, Rio de Janeiro'}];
	$scope.tipo = $stateParams.tipo;
	$scope.num = $stateParams.num;
	$scope.tipoatend = ($stateParams.tipo=="Consulta"?'CONSULTA':'SOLICITAÇÃO');
	$scope.local = function() {
		getMapLocation();
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
			alert("envia solicitação ao banco")
			$scope.backhome();
		} else {
			//alert(res)
		}
		});
	};
	$scope.backhome = function() {
		$ionicHistory.nextViewOptions({disableBack: true});
		$state.go('app.home');		
	}
	$scope.goahead = function() {
		$state.go('app.vacinavet',{tipo:$stateParams.tipo, num:$stateParams.num});		
	}
})

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

//--------------------------------------------------------------------------------------------------------------------------------------------------
.controller('perfilCtrl', function($scope, $stateParams, myhost, server, cwvars, myFactory, $state, mydata, $rootScope, $ionicActionSheet) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Perfil";
    $scope.data = {};    
	$scope.dist = 0;
	$scope.datetemp = "mm/dd/aaaa";
	$scope.shownasc = false;
	//
	$scope.inicio = function()
	{
		$scope.especs = cwvars.especs; 	
		$scope.url = myhost.url+'perfilvet.php?i='+cwvars.userid;
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('não')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				$scope.data = data;
				mydata.dadospessoais = data;
				$scope.datetemp = myFactory.birthDate($scope.data.dt_vet_nascimento);			
				$scope.data.dt_vet_nascimento = myFactory.birthDateInput($scope.data.dt_vet_nascimento);
				$scope.data.str_vet_cep = parseInt($scope.data.str_vet_cep); 
				$scope.foto = myhost.url+$scope.data.str_vet_image;
				$scope.data.str_vet_cpf = parseFloat($scope.data.str_vet_cpf);
				$scope.data.str_vet_cellphone = parseFloat($scope.data.str_vet_cellphone);
				$scope.myspec = buscajson($scope.especs,'int_spec_id',$scope.data.int_spec_id,'str_spec_nome') ; 
				$scope.dist = $scope.data.int_vet_dist;
			}			
		  }).error(function(data) {
				myFactory.aviso('Não foi possível recuperar o seu perfil:',data);
		  });		
	}
	//
	$scope.hidetitlenasc = function() {
		$scope.shownasc = true;
	}
	//------------------------- // adapta para o não aceite de datas full format pelo mysql server do cliente
	function setDate(dt) {
		//alert(dt);
		var dt2 = dt.getFullYear().toString(); 
		var dtm = (dt.getMonth()+1).toString(); // 00 = janeiro
		var dtd = dt.getDate().toString();
		//var hh  = (dt.getHours()-2).toString(); // corrige fuso horário gmt+2 - server do cliente
		var hh  = (dt.getHours()).toString(); 
		var mm  = dt.getMinutes().toString();
		if (dtm.length == 1) {dtm = '0'+dtm;}
		if (dtd.length == 1) {dtd = '0'+dtd;}
		if (hh.length == 1) {hh = '0'+hh;}
		if (mm.length == 1) {mm = '0'+mm;}
		dt2 += '-'+dtm+'-'+dtd+' '+hh+':'+mm+':00';		
		//alert(dt2);
		return dt2;
	}	
	
	// perfil
	$scope.salva = function() {		
		$scope.data.int_spec_id = buscajson($scope.especs,'str_spec_nome',document.getElementById("spc").value,'int_spec_id');
		$scope.data.int_vet_dist = document.getElementById("dist").value;
		// tratamento de data para o server do cliente
		var dt2 = setDate($scope.data.dt_vet_nascimento);
		$scope.data.dt2 = dt2;
		//		
		$scope.url = myhost.url+'perfilvet.php?i='+cwvars.userid+'&ed='+cwvars.userid+'&j='+JSON.stringify($scope.data); 		
		server.send($scope.url).success(function(data) { 
			if ((JSON.stringify(data).indexOf('já')>=0)||(JSON.stringify(data).indexOf('rro')>=0)) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				myFactory.aviso('Perfil atualizado com sucesso','');
				cwvars.username = $scope.data.str_vet_nome;
				cwvars.endereco = $scope.data.str_vet_address;
				cwvars.userespec= document.getElementById("spc").value;
				cwvars.cidade = $scope.data.str_vet_cidade;
				cwvars.uf = $scope.data.str_vet_uf;
				$rootScope.$emit("updatemenu", {});
				myFactory.goHome();
			}			
		  }).error(function(data) {
				myFactory.aviso('Não foi possível gravr o seu perfil',data);
		  });
		
	}
	//

	$scope.documents = function() {
		$state.go('app.perfil2');
	}
	//
	$scope.dadosBanc = function() {
		$state.go('app.perfil3');
	}

	//
   $scope.novafoto = function() { 
      var myPopup = $ionicActionSheet.show({
         scope: $scope,
         buttons: [
			{ text: 'Tirar com a camera' },
            { text: 'Escolher da galeria' },
         ],
		titleText: '<h4>Editar Foto</h4>',
		cancelText: 'Cancelar',
		cssClass: 'social-actionsheet',
		cancel: function() { },
		buttonClicked: function(index) {
			if (index==0)
				$scope.tirarfoto();
			if (index==1)
				$scope.escolherfoto();
			return true;
		}
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
	//
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
	//
    function onSuccess(imageURI) {
		$scope.foto = imageURI;
		cwvars.userimage = imageURI;
		$scope.$apply();
		window.localStorage.setItem("userphoto", imageURI);  
		$rootScope.$emit("updatemenu", {});
		createFileEntry(imageURI);
    }
	//
    function onFail(message) {
		myFactory.aviso('Ação cancelada','');
    }   
	function createFileEntry(imageURI) {
		imageURI = myFactory.checkfile(imageURI);
		window.resolveLocalFileSystemURL(imageURI, copyFile, fail);    	
	}
	//
	function copyFile(fileEntry) {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, 	
			function(fileSystem2) {
				$scope.newfilename = 'user_'+cwvars.userid+'_'+Math.round(+new Date()/1000).toString()+'.jpg';
				fileEntry.copyTo( fileSystem2, $scope.newfilename, onCopySuccess, fail);
		  }, fail ); 
	}	
	// perfil
	function onCopySuccess(entry) {
		cwvars.userimage   = cordova.file.dataDirectory+$scope.newfilename;
		$scope.data.imagem = cordova.file.dataDirectory+$scope.newfilename;
		$scope.$apply();	
		//upload(cordova.file.dataDirectory+$scope.newfilename,0); 
		myFactory.upload('vetupload.php?i='+cwvars.userid, cordova.file.dataDirectory+$scope.newfilename, '', 'image', true);
	}	
	//
    function fail(error) {
		myFactory.aviso('Ocorreu um erro inesperado!',error.code+'/'+error.source+'/'+error.target);
    }
})

//--------------------------------------------------------------------------------------------------------------------------------------
.controller('perfil2Ctrl', function($scope, $stateParams, myhost, server, cwvars, myFactory, $state, $ionicActionSheet, $ionicHistory) {
	$scope.pagetitle = "Documentos";
	//
    $scope.salvar = function() {
		$ionicHistory.goBack(-1);
	}
		
	$scope.documentos = function(tipodoc) { 
      $scope.tipodoc = tipodoc;
	  var myPopup = $ionicActionSheet.show({
         scope: $scope,
         buttons: [
			{ text: 'Tirar com a camera' },
            { text: 'Escolher da galeria' },
         ],
		titleText: '<h4>'+(tipodoc==1?'Enviar Documento':'Enviar Diploma')+'</h4>',
		cancelText: 'Cancelar',
		cssClass: 'social-actionsheet',
		cancel: function() { },
		buttonClicked: function(index) {
			if (index==0)
				$scope.tirarfoto();
			if (index==1)
				$scope.escolherfoto();
			return true;
		}
      });
   };
	//
	$scope.tirarfoto = function() {		
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			encodingType: Camera.EncodingType.JPEG,
			encodingType: Camera.EncodingType.JPEG,
			mediaType: Camera.MediaType.PICTURE,
			allowEdit: true,
			correctOrientation: true
			});
	}
	//
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
	//
    function onSuccess(imageURI) {
		createFileEntry(imageURI);
    }
	//
    function onFail(message) {
		myFactory.aviso('Ação cancelada','');
    }   
	function createFileEntry(imageURI) {
		imageURI = myFactory.checkfile(imageURI);
		window.resolveLocalFileSystemURL(imageURI, copyFile, fail);    	
	}
	//perfil2Ctrl
	function copyFile(fileEntry) {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, 	
			function(fileSystem2) {
				$scope.newfilename = 'user_'+cwvars.userid+'_docto_'+Math.round(+new Date()/1000).toString()+'.jpg';
				fileEntry.copyTo( fileSystem2, $scope.newfilename, onCopySuccess, fail);
		  }, fail ); 
	}	
	// documentos
	function onCopySuccess(entry) {
		myFactory.upload('vetuploaddocto.php?i='+cwvars.userid+'&t='+$scope.tipodoc, cordova.file.dataDirectory+$scope.newfilename, '', 'image', true);
	}	
	//
    function fail(error) {
		myFactory.aviso('Ocorreu um erro inesperado!',error.code+'/'+error.source+'/'+error.target);
    }
	
})


//------------------------------------------------------------------------------------------------------------
.controller('perfil3Ctrl', function($scope, $stateParams, myhost, server, cwvars, myFactory, $state, mydata, $ionicHistory) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.pagetitle = "Dados Bancários";
	$scope.bancos = {};
	//
	$scope.inicio = function() {
		$scope.listabancos();
		$scope.data = mydata.dadospessoais;
	}
	//

	$scope.listabancos = function() { 
		$scope.url = myhost.url+'bancos.php';
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('Não')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				$scope.bancos = data;
			}			
			}).error(function(data) {
				myFactory.aviso('Não foi possível obter a relação de bancos:',data);
			});
		
	};
	// PERFIL 3 - dados bancários
	$scope.salvar = function() {
		$scope.url = myhost.url+'vetcadbancarios.php?i='+cwvars.userid+'&j='+JSON.stringify($scope.data);
		server.send($scope.url).success(function(data) {
			if ((JSON.stringify(data).indexOf('já')>=0)||(JSON.stringify(data).indexOf('rro')>=0)) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				myFactory.aviso(JSON.stringify(data),'');				
				$ionicHistory.goBack(-1);
			}			
	  }).error(function(data) {
			myFactory.aviso('Houve um problema gravando os dados bancários',data);
	  });				
	}
	
})

//----------------------------------------------------------------------------------------------------------
.controller('servicosCtrl', function($scope, $stateParams, cwvars, myhost, server, myFactory, $ionicPopup, $state, vacinas) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
 	$scope.pagetitle = "Serviços";
	$scope.data = {};
	$scope.valor1 = 120;
	$scope.showCao = false;
	$scope.showGato = false;	
	$scope.vacinas = [];
	$scope.valor = 0;
	$scope.tipo = $stateParams.num;
	//
	$scope.mostraCao = function () {
		//$scope.showCao = !$scope.showCao;
		//$state.go('app.editavacinas',{num:0})
		$scope.editavacinas(0);
	};
	$scope.mostraGato = function () {
		//$scope.showGato = !$scope.showGato;
		//$state.go('app.editavacinas',{num:1})
		$scope.editavacinas(1);
	};
		
	//
	$scope.inicio = function()
	{
		$scope.url = myhost.url+'vetservicos.php?i='+cwvars.userid;
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('não')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				$scope.data = data;
				$scope.data.flo_serv_consulta= parseFloat($scope.data.flo_serv_consulta).toFixed(2);
				$scope.data.flo_serv_curativo= parseFloat($scope.data.flo_serv_curativo).toFixed(2);
				$scope.data.flo_serv_admin   = parseFloat($scope.data.flo_serv_admin).toFixed(2);
				$scope.data.flo_serv_fezes   = parseFloat($scope.data.flo_serv_fezes).toFixed(2);
				$scope.data.flo_serv_urina   = parseFloat($scope.data.flo_serv_urina).toFixed(2);
				$scope.data.flo_serv_sangue  = parseFloat($scope.data.flo_serv_sangue).toFixed(2);
				$scope.data.flo_serv_raspado = parseFloat($scope.data.flo_serv_raspado).toFixed(2);
				//
				$scope.data.statusfezes   = ($scope.data.bol_serv_fezes==1?true:false);
				$scope.data.statusurina   = ($scope.data.bol_serv_urina==1?true:false);
				$scope.data.statussangue  = ($scope.data.bol_serv_sangue==1?true:false);
				$scope.data.statusraspado = ($scope.data.bol_serv_raspado==1?true:false);
				//
				$scope.levacinas();
			}			
		  }).error(function(data) {
				myFactory.aviso('Houve problemas lendo os dados de serviço. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
		  });
		if ($stateParams.num==0) {
			$scope.pagetitlevac = "Vacinas para Cães";		
		}
		else {
			$scope.pagetitlevac = "Vacinas para Gatos";				
		}
		  
	};
	$scope.levacinas = function() {
		$scope.url = myhost.url+'vacinasvet.php?i='+cwvars.userid+'&t=0'; 
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('Não')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				$scope.vacinas = data;
				
				for (i = 0; $scope.vacinas.length > i; i++) {
					if ($scope.vacinas[i].flo_vac_preco==null)
						$scope.vacinas[i].flo_vac_preco = 0;
					else
						$scope.vacinas[i].flo_vac_preco = parseFloat($scope.vacinas[i].flo_vac_preco);
					if ($scope.vacinas[i].int_status_id==1)
						$scope.vacinas[i].status = true;
					else 
						$scope.vacinas[i].status = false;
				}
				vacinas = $scope.vacinas;
			}			
		  }).error(function(data) {
    			//myFactory.aviso('Ocorreu um erro inesperado ('+data+')','Houve problemas lendo os dados das vacinas. Por favor, tente mais tarde.');				
    			myFactory.aviso('Não foi possível ler os dados das vacinas. Por favor, tente mais tarde.',data);
		  });
		
	};
	$scope.gravavacinas = function() {
		//$scope.text = JSON.stringify($scope.vacinas);
		$scope.url = myhost.url+'vacinasvet.php?g=1&i='+cwvars.userid+'&j='+JSON.stringify($scope.vacinas); 
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('Não')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				myFactory.aviso('Vacinas salvas com sucesso','');
			}			
		  }).error(function(data) {
				//myFactory.aviso('Houve problemas gravando os dados das vacinas. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');				
                myFactory.aviso('Não foi possível gravar os dados das vacinas. Por favor, tente mais tarde.',data);
		  });
		  $state.go('app.servicos')
	};
	$scope.gravaservicos = function() {
		$scope.url = myhost.url+'vetservicos.php?ed=1&i='+cwvars.userid+'&j='+JSON.stringify($scope.data); 
		//$scope.text = $scope.url;
		server.send($scope.url).success(function(data) {
			if (JSON.stringify(data).indexOf('Error')>=0) {
				myFactory.aviso(JSON.stringify(data),'');				
			}
			else {
				myFactory.aviso('Serviços salvos com sucesso','');
			}			
		  }).error(function(data) {
				//myFactory.aviso('Houve problemas gravando os dados dos serviços. Por favor, tente mais tarde.','Ocorreu um erro inesperado ('+data+')');
                myFactory.aviso('Não foi possível gravar os dados dos serviços. Por favor, tente mais tarde.',data);
		  });
	};
	//
	$scope.editavacinas = function(tipo) {
		$state.go('app.editavacinas',{num:tipo})
	}
	
	
})

//---------------------------------------------------------------
.controller('editavacinasCtrl', function($scope, $stateParams, vacinas) {
	$scope.$on('$ionicView.enter', function(e) {$scope.inicio();});
	$scope.inicio = function() {
		if ($stateParams.num==0) {
			$scope.pagetitle = "Vacinas para Cães";		
		}
		else {
			$scope.pagetitle = "Vacinas para Gatos";				
		}
		$scope.tipo = $stateParams.num;
		alert(vacinas.length);
		$scope.vacinas = vacinas;
		alert($scope.vacinas.length)
	}
	
})



.controller('pagpendCtrl', function($scope, $stateParams) {
	$scope.pagetitle = "Pagamentos Pendentes";
	$scope.data = [{'nome':'Josué Gomes Nathan da Silva','spec':'Cirurgião Especialista','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':true}];
})

.controller('examesCtrl', function($scope, $stateParams) {
	$scope.pagetitle = "Exames";
	$scope.data = [{'nome':'Josué Gomes Nathan da Silva','spec':'Cirurgião Especialista','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':false}, {'nome':'Dr. Billy','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'120,00','num':'1','image':'img/CaesIcone.jpg','status':true}];
})

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
	$scope.data = [{'nome':'Dr. Anderson Gonçalves','spec':'Acupuntura Animal','datahora':'01/09 15:00','valor':'130,00','num':'1','image':'img/MolduraFoto2.jpg','status':false}, {'nome':'Dr. Antonio Cortes','spec':'Clínico Geral','datahora':'01/09 15:00','valor':'100,00','num':'1','image':'img/MolduraFoto2.jpg','status':false}, {'nome':'Dr. Andrea Correa','spec':'Nutrição de cães e gatos','datahora':'01/09 15:00','valor':'150,00','num':'1','image':'img/MolduraFoto2.jpg','status':true}];
})

/*
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

.controller('caogatoCtrl', function($scope, $stateParams, cwvars) {
	$scope.pagetitle = $stateParams.origem;
	switch($stateParams.origem) {
		case "Vacinar":
		$scope.url = "vacinas";
		cwvars.codserv = 2;
		break;
	}	
})
*/

.controller('agendarCtrl', function($scope, $stateParams, $ionicPopup, cwvars, $ionicHistory, $state) { 
	$scope.pagetitle = "Agendar";//$stateParams.tipo+$stateParams.num;
	$scope.tiposervico = cwvars.codserv;
	$scope.codservico = $stateParams.tipo;
	$scope.medico = $stateParams.num;
	$scope.titulo = "Aguarde a confirmação com seu médico em até 72 horas";
	$scope.mensagem = "Atendimento para:\nendereço";
   // A confirm dialog
   $scope.showConfirm = function() {
	 var confirmPopup = $ionicPopup.confirm({
	   title: $scope.titulo,
	   template: $scope.mensagem,
	   cancelText: 'Editar endereço',
	   okType: 'button-energized'
	 });
	 confirmPopup.then(function(res) {
	   if(res) {
		 // yes
		 $scope.backhome();
	   } else {
		 // no
		 $scope.showPopup();
	   }
	 });
   };
	$scope.backhome = function() {
		$ionicHistory.nextViewOptions({disableBack: true});
		$state.go('app.home');		
	}
   
   // Custom popup
   $scope.showPopup = function() {
      $scope.data = {}    
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.end" placeholder="Endereço" style="border-bottom:1px solid #999"><input type = "text" ng-model = "data.cep" placeholder="Cep" style="border-bottom:1px solid #999"><input type = "text" ng-model = "data.cidade"  placeholder="Cidade" style="border-bottom:1px solid #999">Estado: '+cwvars.selectUF,    
         title: 'Editar endereço',
         subTitle: 'Informe os dados do novo endereço ',
         scope: $scope,
         buttons: [
            { text: 'Cancelar' }, {
               text: '<b>Salvar</b>',
               type: 'button-energized',
                  onTap: function(e) {						
                     if ((!$scope.data.end)||(!$scope.data.cep)||(!$scope.data.cidade)||(!$scope.data.uf)) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {
                        return $scope.data.end;
                     }
                  }
            }
         ]
      });
      myPopup.then(function(res) {
         console.log('Tapped!', res);
		 //alert($scope.data.end+"/"+$scope.data.cep+"/"+$scope.data.cidade+"/"+$scope.data.uf);
      });    
   };   
   
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
            myService.foo();
			$scope.alerta();
    };   
})


		
		
; //---//

		/*
		myFactory.aviso('screen.orientation: ','angle:'+screen.orientation.angle+', type:'+screen.orientation.type);		
		alert('Orientation is ' + screen.orientation);
		var keys = [];
		for(var k in screen.orientation) keys.push(k); 
		alert("total " + keys.length + " keys: " + keys);
		*/
