
myApp.service('RelojService', ['$http', function ($http) {
  var relojes = [];
  var ultimaLectura = null;
  return {
    get: function() {
      return $http.get('/api/reloj');
    },
    post: function (p_data) {
      if (typeof p_data === 'string') p_data = JSON.parse( p_data );
      return $http.post('/api/reloj', p_data);
    },
    delete: function(ciudad) {
      return $http.delete('/api/reloj/' + ciudad);
    }
  }
}]);
