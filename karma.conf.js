module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'vendor/bower_components/angular/angular.js',
      'vendor/bower_components/angular-mocks/angular-mocks.js',
      'vendor/bower_components/angular-resource/angular-resource.js',
      'vendor/bower_components/angular-route/angular-route.js',
      'src/**/*.js',
      'test/**/*.spec.js',
      'dist/templates/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test/unit.xml',
      suite: 'unit'
    }

  });
};
