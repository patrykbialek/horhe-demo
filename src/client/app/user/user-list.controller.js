(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('Userlist', Userlist);

    /* @ngInject */
    function Userlist($location, $timeout, authservice, config) {
        /* jshint validthis: true */
        var vm = this;
        var authData = authservice.getAuth();

        var refUsers = new Firebase(config.databaseUrl + 'users');

        vm.title = 'User list';
        vm.users = [];

        //region Functions

        vm.goToUser = goToUser;

        //endregion

        activate();

        ////////////////

        function activate() {
            getUsers();
        }

        function getUsers() {
            refUsers.on('value', function (snap) {
                $timeout(function () {
                    vm.users = snap.val();
                });
            });
        }

        function goToUser(user) {
            if (user) {
                $location.path('user-details/' + user.id);
            }
        }
    }
})();
