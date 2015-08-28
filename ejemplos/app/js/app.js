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
        title: 'About',
        url: '/about'
      }
    ];

  //$rootScope.menuItems = NavigationService.get();

  }]);
