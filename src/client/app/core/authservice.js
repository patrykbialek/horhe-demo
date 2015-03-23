(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authservice', authservice);

    /* @ngInject */
    function authservice($location, $state, config) {
        /* jshint validthis:true */
        var ref = new Firebase(config.databaseUrl);
        var isAdmin = false;

        var service = {
            getAdmin: getAdmin,
            getAuth: getAuth
        };

        return service;

        function getAdmin() {
            var userId = ref.getAuth().uid;
            var userExists = new Firebase(config.databaseUrl + '/admins/' + userId);

            if (userExists) {
                userExists.on('value', function (snap) {
                    isAdmin = snap.val();
                    return isAdmin;
                });
            }
        }

        function getAuth() {
            var authData = ref.getAuth(),
                isAnonymus = $state.current.anonymus,
                path = $state.state;

            if (authData) {
                return authData;
            } else if (isAnonymus) {
                $location.path(path);
            } else {
                $location.path('login');
            }
        }
    }
})();
