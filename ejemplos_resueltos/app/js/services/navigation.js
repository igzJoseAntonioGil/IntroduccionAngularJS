
myApp.service('NavigationService', function () {
  var selected = 'Home';
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
          title: 'Modelos',
          url: '/modelos'
        },
        {
          title: 'About',
          url: '/about'
        }
      ];
    },
    select: function (option) {
      selected = option;
    },
    getSelected: function () {
      return selected;
    }
  }
});
