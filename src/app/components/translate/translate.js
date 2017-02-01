angular.module('translate', ['pascalprecht.translate'])

.config(['$translateProvider', '$translatePartialLoaderProvider', function ($translateProvider, $translatePartialLoaderProvider) {
  $translatePartialLoaderProvider.addPart('home');
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/data/i18n/{part}/{lang}.json'
  });
  $translateProvider.registerAvailableLanguageKeys(['en', 'cs'], {
    'en*': 'en',
    'cs*': 'cs',
    '*': 'en'
  }).determinePreferredLanguage();
  $translateProvider.fallbackLanguage('cs');
  $translateProvider.useLoaderCache(true);
  $translateProvider.useCookieStorage();
  $translateProvider.useSanitizeValueStrategy('escapeParameters');
}]);
