
myApp.service('NavigationService', function () {
  return {
    get: function() {
      return [
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
    }
  }
});
