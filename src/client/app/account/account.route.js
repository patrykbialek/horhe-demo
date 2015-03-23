(function() {
    'use strict';

    angular
        .module('app.account')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/account/login.html',
                    controller: 'Account',
                    controllerAs: 'vm',
                    title: 'Login',
                    anonymus: true
                }
            },
            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: 'app/account/register.html',
                    controller: 'Account',
                    controllerAs: 'vm',
                    title: 'Register',
                    anonymus: true
                }
            }
        ];
    }
})();
