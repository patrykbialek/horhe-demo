(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('Account', Account);

    /* @ngInject */
    function Account($location, $q, $timeout, authservice, config) {
        /* jshint validthis: true */
        var vm = this;
        var ref = new Firebase(config.databaseUrl);
        var refUsers = new Firebase(config.databaseUrl + 'users');
        var isAdmin = false;

        vm.isAdmin = false;
        vm.isAuth = false;
        vm.login = login;
        vm.loginError = undefined;
        vm.loginName = undefined;
        vm.logout = logout;
        vm.register = register;
        vm.registerError = undefined;
        vm.title = 'login';
        vm.user = {};

        activate();

        ////////////////

        var tt;

        function activate() {
            getAdmin();
            ref.onAuth(authDataCallback);
        }

        function authDataCallback(authData) {
            if (authData) {
                vm.isAuth = true;
                vm.loginName = authData.password.email;
            } else {
                vm.isAuth = false;
                vm.loginName = undefined;
            }
        }

        //region Login
        function login() {
            ref.authWithPassword({
                email    : vm.user.loginName,
                password : vm.user.password
            }, function(error, authData) {
                if (error) {
                    $timeout(function() {
                        vm.loginError = error.message;
                    });
                } else {
                    getAdmin();

                    $timeout(function() {
                        if (vm.isAdmin === true) {
                            $location.path('/');
                        } else {
                            $location.path('profile');
                        }
                    }, 500);
                }
            });
        }
        //endregion

        //region Logout
        function logout() {
            ref.unauth();
            $location.path('login');
        }
        //endregion

        //region Register
        function register() {
            ref.createUser({
                email    : vm.user.loginName,
                password : vm.user.password
            }, function(error, userData) {
                if (error) {
                    console.log('Register Failed!', error);

                    $timeout(function() {
                        vm.registerError = error.message;
                    }, 500);
                } else {
                    $timeout(function () {
                        refUsers.child(userData.uid).set({
                            provider: 'password',
                            loginName: vm.user.loginName,
                            createdBy: userData.uid,
                            createdDate: new Date(),
                            id: userData.uid
                        }, function() {
                            login();
                        });
                    });
                }
            });
        }
        //endregion

        function getAdmin() {
            if (ref.getAuth()) {
                var userId = ref.getAuth().uid;
                var userExists = new Firebase(config.databaseUrl + '/admins/' + userId);

                if (userExists) {
                    userExists.on('value', function (snap) {
                        isAdmin = snap.val();
                        vm.isAdmin = isAdmin;

                        return isAdmin;
                    });
                }
            }
        }
    }
})();
