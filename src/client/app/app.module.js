(function() {

    'use strict';

    angular.module('app', [
        /* Shared modules */
        'app.core',
        'app.widgets',

        /* Feature areas */
        'app.account',
        'app.dashboard',
        'app.layout',
        'app.profile',
        'app.user'
    ]);

})();
