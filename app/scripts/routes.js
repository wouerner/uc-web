    app.config(['$routeProvider', function ($routeProvider){
        $routeProvider
        .when('/uc/:id', {templateUrl: 'views/index.html'})
        .when('/uc/:id/show', {templateUrl: 'views/documento/show.html'})
        .when('/index', { controller: 'DocumentoController', templateUrl: 'views/documento/index.html'})
        .when('/regranegocio', { controller: 'RegraNegocioController', templateUrl: 'views/regraNegocio/index.html'})
        .when('/regranegocio/:id', { controller: 'RegraNegocioController', templateUrl: 'views/regraNegocio/index.html'})
        .when('/mensagem', { controller: 'MensagemController', templateUrl: 'views/mensagem/index.html'})
        .when('/tela', { controller: 'TelaController', templateUrl: 'views/tela/index.html'})
        .when('/tela/:id', { controller: 'TelaController', templateUrl: 'views/tela/index.html'})
        .when('/campo/:id', { controller: 'CampoController', templateUrl: 'views/campo/index.html'})
        .when('/projeto', { controller: 'ProjetoController', templateUrl: 'views/projeto/index.html'})
        .when('/documento/:id', { controller: 'DocumentoController', templateUrl: 'views/documento/index.html'})
        .otherwise({redirectTo: '/'});
    }]);
