angular.module('encs', [
  'ngRoute',
  'ngAria',
  'ngAnimate',
  'ngTouch',
  'ngSanitize',
  'ngCookies',
  'pascalprecht.translate',
  'translate',
  'ui.bootstrap',
  'home',
  'cards',
  'templates.app'
]);

angular.module('encs').run(['$rootScope', '$translate', function ($rootScope, $translate) {
  $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
    $translate.refresh();
  });
}]);

angular.module('encs').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider.
    when('/', {
      template: '<home></home>'
    }).
    otherwise('/');
}]);

angular.module('encs').controller('AppCtrl', ['$scope', '$translate', '$translatePartialLoader', function ($scope, $translate, $translatePartialLoader) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
  $translatePartialLoader.addPart('shared');
}]);

angular.module('encs').controller('HeaderCtrl', ['$scope', '$location', '$translatePartialLoader', function ($scope, $location, $translatePartialLoader) {
  $translatePartialLoader.addPart('header');
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
  $scope.isNavCollapsed = true;
}]);

angular.module('encs').controller('FooterCtrl', ['$translatePartialLoader', function ($translatePartialLoader) {
  $translatePartialLoader.addPart('footer');
}]);
