'use strict';

/**
 * @ngdoc overview
 * @name sim12WebApp
 * @description
 * # sim12WebApp
 *
 * Main module of the application.
 */
var app = angular
  .module('sim12WebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'satellizer',
    "ngTable",
    "textAngular",
    "ngDialog",
    'ngTagsInput',
    'angularFileUpload'
  ])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {

        // Redirect to the auth state if any other states
        // are requested other than users
        $urlRouterProvider.otherwise('/auth');

        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: 'views/auth.html',
                controller: 'AuthCtrl as auth'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'views/user.html',
                controller: 'UserCtrl as user'
            })
            .state('projetoIndex', {
                url: '/projeto',
                templateUrl: 'views/projeto/index.html',
                controller: 'ProjetoController'
            })
            .state('documentoIndex', {
                url: '/documento/:id',
                templateUrl: 'views/documento/index.html',
                controller: 'DocumentoController'
            })
            .state('ucIndex', {
                url: '/uc/:id',
                templateUrl: 'views/documento/ucindex.html',
                controller: 'DocumentoController'
            })
            .state('ucShow', {
                url: '/uc/:id/show',
                templateUrl: 'views/documento/show.html',
                controller: 'DocumentoController'
            });

        //.when('/uc/:id', {templateUrl: 'views/index.html'})
        //.when('/uc/:id/show', {templateUrl: 'views/documento/show.html'})
        //.when('/index', { controller: 'DocumentoController', templateUrl: 'views/documento/index.html'})
        //.when('/regranegocio', { controller: 'RegraNegocioController', templateUrl: 'views/regraNegocio/index.html'})
        //.when('/regranegocio/:id', { controller: 'RegraNegocioController', templateUrl: 'views/regraNegocio/index.html'})
        //.when('/mensagem', { controller: 'MensagemController', templateUrl: 'views/mensagem/index.html'})
        //.when('/tela', { controller: 'TelaController', templateUrl: 'views/tela/index.html'})
        //.when('/tela/:id', { controller: 'TelaController', templateUrl: 'views/tela/index.html'})
        //.when('/campo/:id', { controller: 'CampoController', templateUrl: 'views/campo/index.html'})

    }).constant("API", {url: 'http://uc-new.local.dev'});
