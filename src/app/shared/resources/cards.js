angular.module('resources.cards', ['ngResource']);
angular.
  module('resources.cards').
  factory('Cards', ['$resource',
    function($resource) {
      return $resource('data/vocab.json', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);

