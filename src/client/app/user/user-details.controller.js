(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('Userdetails', Userdetails);

    /* @ngInject */
    function Userdetails($stateParams, $timeout, $window, authservice, config) {
        /* jshint validthis: true */
        var vm = this;
        var authData = authservice.getAuth();
        var userId = $stateParams.id;

        var refUser = new Firebase(config.databaseUrl + 'users/' + userId);
        var refUsers = new Firebase(config.databaseUrl + 'users');

        vm.title = 'Edit user';
        vm.user = undefined;

        //region Functions

        vm.goBack = goBack;
        vm.save = save;

        //endregion

        activate();

        ////////////////

        function activate() {
            getRequestedUser();
        }

        function getRequestedUser() {
            refUser.on('value', function (snap) {
                $timeout(function () {
                    vm.user = snap.val();
                });
            });
        }

        function goBack() {
            $window.history.back();
        }

        function save() {
            if (authData) {
                // save the user's profile into Firebase so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                refUsers.child(userId).update({
                    firstName: vm.user.firstName,
                    lastName: vm.user.lastName,
                    loginName: vm.user.loginName
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
