'use strict';

/**
 * @ngdoc function
 * @name sim12WebApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the sim12WebApp
 */
angular.module('sim12WebApp')
  .controller('UserCtrl', function ($http) {
        var vm = this;

        vm.users;
        vm.error;

        vm.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get('http://uc-new.local.dev/api/authenticate').success(function(users) {
                vm.users = users;
            }).error(function(error) {
                vm.error = error;
            });
        }
  });
