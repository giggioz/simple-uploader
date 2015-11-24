Package.describe({
  name: 'giggioz:simple-uploader',
  version: '0.0.2',
  summary: 'A simple way to create fancy styled file inputs with some sugar about security',
  git: '',
  documentation: 'README.md'
});


Package.onUse(function(api) {
    api.versionsFrom('1.2.1');

    api.use('templating');
    api.use('cfs:gridfs');
    api.use('cfs:standard-packages');
    api.use('accounts-base'); //TODO WEAK


    api.addAssets('assets/preloader.gif', 'client');

    api.addFiles('client/css/button.css', 'client');

    api.addFiles('collections/collections.js');

    api.addFiles('server/security.js', 'server');
    api.addFiles('server/publications.js', 'server');

    api.addFiles('client/templates/supButton.html', 'client');
    api.addFiles('client/templates/supButton.js', 'client');
    api.addFiles('client/templates/supViewer.html', 'client');
    api.addFiles('client/templates/supViewer.js', 'client');

    api.export('supSecurityOptions', 'server');
});

Package.onTest(function (api) {
  api.use([
    'tinytest',
    'giggioz:simple-uploader'
  ], ['client', 'server']);

  api.addFiles('tests/client/client-tests.js', 'client');
  api.addFiles('tests/server/server-tests.js', 'server');
});
