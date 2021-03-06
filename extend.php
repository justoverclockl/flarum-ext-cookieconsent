<?php

/*
 * This file is part of justoverclock/flarum-ext-cookieconsent.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Justoverclock\CookieConsent;

use Flarum\Extend;
use Flarum\Api\Event\Serializing;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Extend\Locales(__DIR__.'/resources/locale'),
    (new Extend\Settings)
        ->serializeToForum('GoogleAnalytics', 'justoverclock-cookieconsent.GoogleAnalytics'),
    (new Extend\Settings)
        ->serializeToForum('LinkToPrivacyPolicy', 'justoverclock-cookieconsent.LinkToPrivacyPolicy'),
    (new Extend\Settings)
        ->serializeToForum('pub', 'justoverclock-cookieconsent.pub'),
];
