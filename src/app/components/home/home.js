angular.module('home', [])
.component('home', {
    templateUrl: 'components/home/home.tpl.html',
    controller: ['$scope', '$translatePartialLoader',
      function CardController($scope, $translatePartialLoader) {
        $translatePartialLoader.addPart('home');
      }
    ]
  });
