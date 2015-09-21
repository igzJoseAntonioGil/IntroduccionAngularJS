// Angular application object
var myApp = angular.module("myApp", ["ngRoute"]);

myApp
  .config(['$routeProvider', function($routeProvider) {
    // WARNING: need to append 'Provider' to 'bmwUtil' provider module
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/ofertas', {
        templateUrl: 'views/ofertas.html',
        controller: 'OfertaCtrl'
      })
      .when('/ofertas/:oferta', {
        templateUrl: 'views/detalle_oferta.html',
        controller: 'OfertaCtrl'
      })
      .when('/modelos', {
        templateUrl: 'views/modelos.html',
        controller: 'ModelosCtrl'
      })
      .when('/modelos/:modelo', {
        templateUrl: 'views/detalle_modelo.html',
        controller: 'ModelosCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

  .run(['$rootScope', '$window', 'NavigationService', function($rootScope, $window, NavigationService) {

    $rootScope.WINDOW_WIDTH = $window.innerWidth;
    $rootScope.WINDOW_HEIGHT = $window.innerHeight;
/*
    $rootScope.menuItems = [
      {
        title: 'Home',
        url: '/home'
      },
      {
        title: 'Ofertas',
        url: '/ofertas'
      },
      {
        title: 'Modelos',
        url: '/modelos'
      },
      {
        title: 'About',
        url: '/about'
      }
    ];
*/
  //$rootScope.menuItems = NavigationService.get();

  }]);
