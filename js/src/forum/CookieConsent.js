import app from 'flarum/forum/app';


export default function () {
  (function ($) {
    $.fn.ihavecookies = function (options) {
      var $element = $(this);
      var settings = $.extend(
        {
          cookieTypes: [
            {
              type: app.translator.trans('flarum-ext-cookieconsent.forum.analyticslabel'),
              value: 'analytics',
              description: app.translator.trans('flarum-ext-cookieconsent.forum.ganalyticsdesc'),
            },
            {
              type:  app.translator.trans('flarum-ext-cookieconsent.forum.adsense'),
              value: 'adsense',
              description: app.translator.trans('flarum-ext-cookieconsent.forum.adsensecookiedesc'),
            },
          ],
          delay: 2000,
          expires: 30,
          advancedBtnLabel: app.translator.trans('flarum-ext-cookieconsent.forum.managecookies'),
          onAccept: function () {},
          uncheckBoxes: false,
        },
        options
      );
      var myCookie = getCookie('cookieControl');
      var myCookiePrefs = getCookie('cookieControlPrefs');

      if (!myCookie || !myCookiePrefs) {
        var cookieTypes =
          '<li><input type="checkbox" name="gdpr[]" value="necessary" checked="checked" disabled="disabled"> <label title="' +
          settings.fixedCookieTypeDesc +
          '">' +
          settings.fixedCookieTypeLabel +
          '</label></li>';
        $.each(settings.cookieTypes, function (index, field) {
          if (field.type !== '' && field.value !== '') {

            var cookieTypeDescription = '';
            if (field.description !== false) {
              cookieTypeDescription = ' title="' + field.description + '"';
            }
            cookieTypes +=
              '<li><input type="checkbox" id="gdpr-cookietype-' +
              field.value +
              '" name="gdpr[]" value="' +
              field.value +
              '" data-auto="on"> <label for="gdpr-cookietype-' +
              field.value +
              '"' +
              cookieTypeDescription +
              '>' +
              field.type +
              '</label></li>';
          }
        });
        var cookieMessage =
          '<div id="gdpr-cookie-message"><h4>' +
          settings.title +
          '</h4><p>' +
          settings.message +
          ' <a href="' +
          settings.link +
          '">' +
          settings.moreInfoLabel +
          '</a><div id="gdpr-cookie-types" style="display:none;"><h5>' +
          settings.cookieTypesTitle +
          '</h5><ul>' +
          cookieTypes +
          '</ul></div><p><button id="gdpr-cookie-accept" type="button">' +
          settings.acceptBtnLabel +
          '</button><button id="gdpr-cookie-advanced" type="button">' +
          settings.advancedBtnLabel +
          '</button></p></div>';

        setTimeout(function () {
          $($element).append(cookieMessage);
          $('#gdpr-cookie-message').hide().fadeIn('slow');
        }, settings.delay);

        $('body').on('click', '#gdpr-cookie-accept', function () {
          dropCookie(true, settings.expires);
          $('input[name="gdpr[]"][data-auto="on"]').prop('checked', true);

          var prefs = [];
          $.each($('input[name="gdpr[]"]').serializeArray(), function (i, field) {
            prefs.push(field.value);
          });

          setCookie('cookieControlPrefs', JSON.stringify(prefs), 365);
          settings.onAccept.call(this);
        });

        $('body').on('click', '#gdpr-cookie-advanced', function () {
          $('input[name="gdpr[]"]:not(:disabled)').attr('data-auto', 'off').prop('checked', false);
          $('#gdpr-cookie-types').slideDown('fast', function () {
            $('#gdpr-cookie-advanced').prop('disabled', true);
          });
        });
      } else {
        var cookieVal = true;
        if (myCookie === 'false') {
          cookieVal = false;
        }
        dropCookie(cookieVal, settings.expires);
      }
      if (settings.uncheckBoxes === true) {
        $('input[type="checkbox"].ihavecookies').prop('checked', false);
      }
    };
    $.fn.ihavecookies.cookie = function () {
      var preferences = getCookie('cookieControlPrefs');
      return JSON.parse(preferences);
    };
    $.fn.ihavecookies.preference = function (cookieTypeValue) {
      var control = getCookie('cookieControl');
      var preferences = getCookie('cookieControlPrefs');
      preferences = JSON.parse(preferences);
      if (control === false) {
        return false;
      }
      if (preferences === false || preferences.indexOf(cookieTypeValue) === -1) {
        return false;
      }
      return true;
    };
    var dropCookie = function (value, expiryDays) {
      setCookie('cookieControl', value, expiryDays);
      $('#gdpr-cookie-message').fadeOut('fast', function () {
        $(this).remove();
      });
    };
    var setCookie = function (name, value, expiry_days) {
      var d = new Date();
      d.setTime(d.getTime() + expiry_days * 24 * 60 * 60 * 1000);
      var expires = 'expires=' + d.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
      return getCookie(name);
    };
    var getCookie = function (name) {
      var cookie_name = name + '=';
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(cookie_name) === 0) {
          return c.substring(cookie_name.length, c.length);
        }
      }
      return false;
    };
  })(jQuery);

  $(document).ready(function () {
    $('body').ihavecookies({
      title: '🍪 ' + app.translator.trans('flarum-ext-cookieconsent.forum.title'),
      message: app.translator.trans('flarum-ext-cookieconsent.forum.cookietext'),
      delay: 600,
      expires: 1,
      link: app.forum.attribute('LinkToPrivacyPolicy'),
       onAccept: function () {
        var myPreferences = $.fn.ihavecookies.cookie();
      },
      uncheckBoxes: true,
      acceptBtnLabel: app.translator.trans('flarum-ext-cookieconsent.forum.acceptcookies'),
      moreInfoLabel: app.translator.trans('flarum-ext-cookieconsent.forum.moreinfo'),
      cookieTypesTitle: app.translator.trans('flarum-ext-cookieconsent.forum.cookietoaccept'),
      fixedCookieTypeLabel: app.translator.trans('flarum-ext-cookieconsent.forum.necessarycookie'),
      fixedCookieTypeDesc: app.translator.trans('flarum-ext-cookieconsent.forum.necessarycookietooltip'),
    });
    //parte dedicata a google analytics
    if ($.fn.ihavecookies.preference('analytics') === true) {
      var ggg = app.forum.attribute('GoogleAnalytics');
      // Codice di google Analytics
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        (i[r] =
          i[r] ||
          function () {
            (i[r].q = i[r].q || []).push(arguments);
          }),
          (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

      ga('create', app.forum.attribute('GoogleAnalytics'), 'auto');
      ga('send', 'pageview');
    }
    //Parte dedicata ad adsense
    if ($.fn.ihavecookies.preference('adsense') === true) {
      // Codice di google Adsense
      let pub = app.forum.attribute('pub');
      const adscode = `<script data-ad-client="${pub}" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`;
      document.getElementsByTagName("head")[0].innerHTML += adscode;
    }
  });
}
