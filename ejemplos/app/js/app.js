// Angular application object
var myApp = angular.module("myApp", ["ngRoute"]);

myApp
  .config(['$routeProvider', function($routeProvider) {
    // WARNING: need to append 'Provider' to 'bmwUtil' provider module

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      })
      .when('/offers', {
        templateUrl: 'views/offers.html',
        controller: 'OfferCtrl',
        controllerAs: 'vm'
      })
      .when('/offers/:offer', {
        templateUrl: 'views/offers.html',
        controller: 'OfferCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

  .run(['$rootScope', '$window', function($rootScope, $window) {
    //$rootScope.IMAGE_BASE_URL = '//iberica.bmw.es/precioscerrados/promociones-2015';
    $rootScope.WINDOW_WIDTH = $window.innerWidth;
    $rootScope.WINDOW_HEIGHT = $window.innerHeight;
  }]);
