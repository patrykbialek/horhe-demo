(function() {
    'use strict';

    angular
        .module('app.user')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'user-list',
                config: {
                    url: '/user-list',
                    templateUrl: 'app/user/user-list.html',
                    controller: 'Userlist',
                    controllerAs: 'vm',
                    title: 'user list',
                    anonymus: false
                }
            },
            {
                state: 'user-details',
                config: {
                    url: '/user-details/:id',
                    templateUrl: 'app/user/user-details.html',
                    controller: 'Userdetails',
                    controllerAs: 'vm',
                    title: 'user details',
                    anonymus: false
                }
            }
        ];
    }
})();
