
myApp.controller('OfertaCtrl', ['$scope', '$routeParams', 'NavigationService', function ($scope, $routeParams, NavigationService) {

  var ofertas = {
    oferta1: {
      title:'Oferta Modelo 1',
      description: 'Chanante ipsum dolor sit amet, ut minim bufonesco consectetur payacho estoy fatal de lo mío ullamco incididunt. Incididunt ea ex bizcoché ea zagal super ñoño elit elit. Bajonaaa ullamco pataliebre eiusmod. Veniam saepe saepe minim sed labore. Nostrud aliqua agazapao eiusmod, ad quis labore chachachá cascoporro pepino en la mano sed interneeeer dolore. One more time quis incididunt et. Zanguango nisi bonico del tó ut minim.',
      price: 20000,
      endDate: '2015-11-01T00:00:00'
    },
    oferta2: {
      title:'Oferta Modelo 2',
      description: 'Chanante ipsum dolor sit amet, dolore nianoniano, tempor et exercitation eveniet eiusmod adipisicing. Nisi ut exercitation sed magna magna soooy crossoverr monetes traeros tol jamón fresquete saepe consectetur tunante. Aliqua nisi dolore ad adipisicing, mamellas tollina dolore ayy qué gustico gañán super ñoño labore.',
      price: 30000,
      endDate: '2015-10-16T00:00:00'
    },
    oferta3: {
      title:'Oferta Modelo 3',
      description: 'Chanante ipsum dolor sit amet, ad incididunt ea ullamco pepinoninoni gañán. Ea, tempor pepino en la mano tollina. Incididunt monguer Guaper ahí va qué chorrazo ad to sueltecico consectetur gaticos asobinao nostrud quis. Ad nuiiiii a tope con la maquinaria tempor elit cacahué eres un pirámidee adipisicing nostrud churretoso gambitero sed.',
      price: 50000,
      endDate: '2015-12-31T23:59:00'
    },
  };

  var Init = function () {

    $scope.ofertas = ofertas;

    if ($routeParams.oferta) {
      $scope.oferta = ofertas[$routeParams.oferta];
    }

    NavigationService.select('Ofertas');
  };

  Init();

}]);
