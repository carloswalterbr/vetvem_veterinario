angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  }) 
  
  .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  }) 
  
.state('app.perfil2', {
    url: '/perfil2',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil2.html',
        controller: 'perfil2Ctrl'
      }
    }
  }) 

  .state('app.perfil3', {
    url: '/perfil3',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil3.html',
        controller: 'perfil3Ctrl'
      }
    }
  })
    
  .state('app.solicit', {
    url: '/solicit',
    views: {
      'menuContent': {
        templateUrl: 'templates/solicit.html',
        controller: 'solicitCtrl'
      }
    }
  }) 
  
  .state('app.servicos', {
    url: '/servicos',
    views: {
      'menuContent': {
        templateUrl: 'templates/servicos.html',
        controller: 'servicosCtrl'
      }
    }
  }) 

  .state('app.cliente', {
    url: '/cliente',
    views: {
      'menuContent': {
        templateUrl: 'templates/cliente.html',
        controller: 'clienteCtrl'
      }
    }
  }) 
   
  .state('app.vacinas', {
    url: '/vacinas/:tipo',
    views: {
      'menuContent': {
        templateUrl: 'templates/vacinas.html',
        controller: 'vacinasCtrl'
      }
    }
  }) 
  
  .state('app.vacinavet', {
    url: '/vacinavet/:tipo/:num',
    views: {
      'menuContent': {
        templateUrl: 'templates/vacinavet.html',
        controller: 'vacinavetCtrl'
      }
    }
  }) 
  
  .state('app.atend', {
    url: '/atend/:tipo/:num',
    views: {
      'menuContent': {
        templateUrl: 'templates/atend.html',
        controller: 'atendCtrl'
      }
    }
  }) 
  
  .state('app.exames', {
    url: '/exames',
    views: {
      'menuContent': {
        templateUrl: 'templates/exames.html',
        controller: 'examesCtrl'
      }
    }
  }) 
  
  .state('app.vet', {
    url: '/vet/:tipo/:num',
    views: {
      'menuContent': {
        templateUrl: 'templates/vet.html',
        controller: 'vetCtrl'
      }
    }
  }) 
  
  .state('app.espec', {
    url: '/espec/:tipo/:num',
    views: {
      'menuContent': {
        templateUrl: 'templates/espec.html',
        controller: 'especCtrl'
      }
    }
  }) 
 
   .state('app.pendentes', {
    url: '/pendentes',
    views: {
      'menuContent': {
        templateUrl: 'templates/pendentes.html',
        controller: 'pendentesCtrl'
      }
    }
  }) 
  
   .state('app.entrar', {
    url: '/entrar',
    views: {
      'menuContent': {
        templateUrl: 'templates/entrar.html',
        controller: 'entrarCtrl'
      }
    }
  })

   .state('app.cadastro3', {
    url: '/cadastro3',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastro3.html',
        controller: 'cadastro3Ctrl'
      }
    }
  })
   .state('app.cadastro2', {
    url: '/cadastro2',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastro2.html',
        controller: 'cadastroCtrl'
      }
    }
  })
   .state('app.cadastro1', {
    url: '/cadastro1',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastro1.html',
        controller: 'cadastroCtrl'
      }
    }
  })
   
   .state('app.arealizar', {
    url: '/arealizar',
    views: {
      'menuContent': {
        templateUrl: 'templates/arealizar.html',
        controller: 'arealizarCtrl'
      }
    }
  }) 
  
	.state('app.detalhesConsulta', {
    url: '/detalhesConsulta/:num',
    views: {
      'menuContent': {
        templateUrl: 'templates/detalhesConsulta.html',
        controller: 'detalhesConsultaCtrl'
      }
    }
  })
 
	.state('app.transferencia', {
    url: '/transferencia',
    views: {
      'menuContent': {
        templateUrl: 'templates/transferencia.html',
        controller: 'transferenciaCtrl'
      }
    }
  })

	.state('app.editavacinas', {
    url: '/editavacinas/:num',
    views: {
      'menuContent': {
        templateUrl: 'templates/editavacinas.html',
        controller: 'servicosCtrl'
      }
    }
  })

	.state('app.financ', {
    url: '/financ',
    views: {
      'menuContent': {
        templateUrl: 'templates/financ.html',
        controller: 'financCtrl'
      }
    }
  })

	.state('app.calendar', {
    url: '/calendar',
    views: {
      'menuContent': {
        templateUrl: 'templates/calendar.html',
        controller: 'calendarCtrl'
      }
    }
  })

     .state('app.urgentes', {
    url: '/urgentes',
    views: {
      'menuContent': {
        templateUrl: 'templates/urgentes.html',
        controller: 'urgentesCtrl'
      }
    }
  }) 

.state('app.detalheurgente', {
    url: '/detalheurgente/:num',
    views: {
      'menuContent': {
        templateUrl: 'templates/detalheurgente.html',
        controller: 'detalheurgenteCtrl'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/entrar');
});
