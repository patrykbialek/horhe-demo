(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[Horhe Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Horhe Demo',
        imageBasePath: '/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg',
        databaseUrl: 'https://horheapp.firebaseio.com/'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$compileProvider', '$logProvider',
        'diagnostics', 'exceptionHandlerProvider', 'routerHelperProvider'];
    /* @ngInject */
    function configure ($compileProvider, $logProvider,
                        diagnostics, exceptionHandlerProvider, routerHelperProvider) {

        diagnostics.enable = false;

        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        configureStateHelper();

        ////////////////

        function configureStateHelper() {
            var resolveAlways = { /* @ngInject */
                ready: function($location, $state, $timeout, authservice, dataservice) {
                    var isAuth = authservice.getAuth();

                    if (isAuth) {
                        return dataservice.ready();
                    }
                }
            };

            routerHelperProvider.configure({
                docTitle: 'Horhe: ',
                resolveAlways: resolveAlways
            });
        }
    }
})();
