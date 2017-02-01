angular.module('cards', ['resources.cards'])


.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/flashcards', {
      template: '<cards></cards>'
    });
}])

.component('cards', {
    templateUrl: 'components/cards/cards.tpl.html',
    controller: ['$scope', '$route', '$translatePartialLoader', 'Cards',
      function CardController($scope, $route, $translatePartialLoader, Cards) {

        $translatePartialLoader.addPart('cards');

        $scope.list = Cards.query();

        $scope.reloadRoute = function() {
          $route.reload();
        };

        $scope.remove = function(contents,index){
          contents.splice(index, 1);
        };

        $scope.filter = {};

        $scope.filterByCategory = function(item) {
          return $scope.filter[item.category] || noFilter($scope.filter);
        };

        $scope.getCategories = function() {
          return ($scope.list || []).
            map(function (item) { return item.category; }).
            filter(function (cat, idx, arr) { return arr.indexOf(cat) === idx; });
        };

        function noFilter(filterObj) {
          return Object.
            keys(filterObj).
            every(function (key) { return !filterObj[key]; });
        }

      }
    ]
  });
