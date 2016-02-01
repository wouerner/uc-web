'use strict';

/**
 * @ngdoc function
 * @name sim12WebApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the sim12WebApp
 */
angular.module('sim12WebApp')
  .controller('AuthCtrl', function ($auth, $state, $location, $http) {
     var vm = this;

    vm.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function(response) {
                    $location.path('/');
                })
            .catch(function(response) {
              //toastr.error(response.data.message);
            });
        }

    vm.login = function() {

        var credentials = {
            email: vm.email,
            password: vm.password
        }

        // Use Satellizer's $auth service to login
        $auth.login(credentials, {
          url: "http://uc-new.local.dev/api/authenticate",
          withCredentials: false,
        }).then(function(data) {

            // If login is successful, redirect to the users state
            $state.go('users', {});
        }, function(response){ console.log(response) });
    }
  });
