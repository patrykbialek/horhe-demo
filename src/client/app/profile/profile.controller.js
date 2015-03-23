(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('Profile', Profile);

    /* @ngInject */
    function Profile($timeout, authservice, config) {
        /* jshint validthis: true */
        var vm = this;
        var authData = authservice.getAuth();

        var refUser = new Firebase(config.databaseUrl + 'users/');
        var refUsers = new Firebase(config.databaseUrl + 'users');

        vm.activate = activate;
        vm.title = 'Profile';
        vm.user = undefined;

        //region Functions

        vm.save = save;

        //endregion

        activate();

        ////////////////

        function activate() {
            if (authData) {
                refUser = new Firebase(config.databaseUrl + 'users/' + authData.uid);
            }

            getRequestedUser();
        }

        function getRequestedUser() {
            refUser.on('value', function (snap) {
                $timeout(function () {
                    vm.user = snap.val();
                });
            });
        }

        function save() {
            if (authData) {
                // save the user's profile into Firebase so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                refUsers.child(authData.uid).update({
                    provider: authData.provider,
                    firstName: vm.user.firstName,
                    lastName: vm.user.lastName,
                    loginName: authData.password.email
                }, function (error, authData) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('ok');
                    }
                });
            }
        }
    }
})();
