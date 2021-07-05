import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderPrimary from "flarum/forum/components/HeaderPrimary";
import CookieConsent from './CookieConsent';

app.initializers.add('justoverclock/flarum-ext-cookieconsent', () => {
  extend(HeaderPrimary.prototype, 'oncreate', CookieConsent);
});

