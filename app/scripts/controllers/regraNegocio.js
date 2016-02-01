/**
 * @ngdoc function
 * @name yoExemploApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yoExemploApp
 */
app.controller('RegraNegocioController', ['$scope', '$http','$sce', 'API', function ($scope, $http, $sce, API){
        $scope.regra = {};
        $scope.regras = [];
        $scope.btnSalvar = 'save';

        $scope.getRegras = function(){
            $http.get(API.url + '/regranegocio/all').
                success(function(data, status, headers, config) {
                    $scope.regras = data;
                });
        };

        $scope.getRegras();

        $scope.save = function() {
                    $http({
                       method  : $scope.btnSalvar == 'save' ? 'POST' : 'PATCH',
                       url     : $scope.btnSalvar == 'save' ? 'regranegocio' : 'regranegocio/'+ $scope.regra.id,
                       data    : jQuery.param($scope.regra) ,  // pass in data as strings
                       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    }).
                    success(function(response){
                        $scope.regras = {};
                        location.reload();
                    }).
                    error(function(response){
                       alert('Incomplete Form');
                    });
                 }

        $scope.editar = function(id) {
                    $scope.regra = $scope.regras[id];
                    $scope.btnSalvar = 'edit';
                 }

        $scope.delete = function(id) {
                       $http
                            .delete('regranegocio/'+id)
                            .success(function(data){
                              location.reload();
                            })
                            .error(function(data) {
                              alert('Unable to delete');
                           });
                }
        $scope.html = function (html){
            return  $sce.trustAsHtml(html);
        }
  }]);

app.controller('RegraNegocioDocController', ['$scope', '$http', 'ngDialog', 'API',function ($scope, $http, ngDialog, API){
        $scope.regra = {};
        $scope.regras = [];
        $scope.btnSalvar = 'save';

        $scope.getRegras = function(id) {
            $http.get(API.url + '/passoregranegocio/allbyid/'+id).
                success(function(data, status, headers, config) {
                    $scope.regras = data;
                    $scope.tags = data;
                });
        };

        $scope.getAllRegras = function() {
            $http.get(API.url + '/regranegocio/all').
                success(function(data, status, headers, config) {
                    $scope.selectRegras = {
                        repeatSelect: null,
                        availableOptions: data
                       };
                });
        };

        $scope.getAllRegras();
        $scope.getRegras($scope.passo.id);

        $scope.loadTags = function(query) {
            return $http.get('regranegocio/all');
        };

        $scope.save = function() {

            $scope.tt = [];
            angular.forEach($scope.tags, function(value, key){
                this.push({name: 'regra_negocio_id[]', value: value.id})

            }, $scope.tt );

            $scope.tt.push({name: 'passo_id', value: $scope.passo.id});
                    $http({
                       method  : $scope.btnSalvar == 'save' ? 'POST' : 'PATCH',
                       url     : $scope.btnSalvar == 'save' ? 'passoregranegocio' : 'passoregranegocio/'+ $scope.regra.id,
                       data    : jQuery.param($scope.tt) ,  // pass in data as strings
                       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    }).
                    success(function(response){
                        $scope.regras = {};
                        location.reload();
                    }).
                    error(function(response){
                       alert('Incomplete Form');
                    });
                 }

        $scope.editar = function(id) {
                    $scope.regra = $scope.regras[id];
                    $scope.btnSalvar = 'edit';
                 }

        $scope.delete = function(id) {
                       $http
                            .delete('regranegocio/'+id)
                            .success(function(data){
                              location.reload();
                            })
                            .error(function(data) {
                              alert('Unable to delete');
                           });
                }

        $scope.show = function (id) {
                    ngDialog.open({ template: 'views/regraNegocio/dialog.html',
                                    controller: ['$scope', '$http', 'dep', '$sce',
                                        function($scope, $http, dep, $sce) {
                                            $scope.html = function (html){
                                                return  $sce.trustAsHtml(html);
                                            }

                                            $scope.regra_negocial = dep.data;
                                        }],
                                    resolve: {
                                            dep: function depFactory() {
                                                return $http.get('regranegocio/'+id);
                                            }
                                        }
                                  });
        }
  }]);
