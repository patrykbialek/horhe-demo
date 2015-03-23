(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard($location, $timeout, config) {
        var vm = this;
        var ref = new Firebase(config.databaseUrl);
        var refUsers = new Firebase(config.databaseUrl + 'users');
        var isAdmin = false;

        vm.title = 'Dashboard';
        vm.userCount = 0;

        activate();

        function activate() {
            getUsers();
            getAdmin();

            $timeout(function() {
                init();
            });
        }

        function getUsers() {
            refUsers.on('value', function (snap) {
                $timeout(function () {
                    vm.userCount = snap.numChildren();
                });
            });
        }

        function init() {
            if (isAdmin === true) {
                $location.path('/');
            } else {
                $location.path('profile');
            }
        }

        function getAdmin() {
            if (ref.getAuth()) {
                var userId = ref.getAuth().uid;
                var userExists = new Firebase(config.databaseUrl + '/admins/' + userId);

                if (userExists) {
                    userExists.on('value', function (snap) {
                        isAdmin = snap.val();

                        return isAdmin;
                    });
                }
            }
        }
    }
})();
