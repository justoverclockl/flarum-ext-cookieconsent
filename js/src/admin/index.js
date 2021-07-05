import app from 'flarum/app';

app.initializers.add('justoverclock/flarum-ext-cookieconsent', () => {
  app.extensionData.for('justoverclock-cookieconsent').registerSetting({
    setting: 'justoverclock-cookieconsent.GoogleAnalytics',
    name: 'GoogleAnalytics',
    type: 'text',
    label: app.translator.trans('flarum-ext-cookieconsent.admin.ga'),
    help: app.translator.trans('flarum-ext-cookieconsent.admin.gadesc'),
    placeholder: 'UA-XXXXX-Y',
  });
  app.extensionData.for('justoverclock-cookieconsent').registerSetting({
    setting: 'justoverclock-cookieconsent.pub',
    name: 'pub',
    type: 'text',
    label: app.translator.trans('flarum-ext-cookieconsent.admin.pub'),
    help: app.translator.trans('flarum-ext-cookieconsent.admin.pubdesc'),
    placeholder: 'ca-pub-XXXXXXXXXXXXXXXX',
  });
  app.extensionData.for('justoverclock-cookieconsent').registerSetting({
    setting: 'justoverclock-cookieconsent.LinkToPrivacyPolicy',
    name: 'LinkToPrivacyPolicy',
    type: 'url',
    label: app.translator.trans('flarum-ext-cookieconsent.admin.linktopp'),
    help: app.translator.trans('flarum-ext-cookieconsent.admin.linktoppdesc'),
    placeholder: 'https://flarum.it/d/72-cookie-policy',
  });
});
