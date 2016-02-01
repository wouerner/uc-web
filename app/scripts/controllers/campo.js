/**
 * @ngdoc function
 * @name yoExemploApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yoExemploApp
 */
app.controller('CampoController', ['$scope', '$http','$routeParams','FileUploader', function ($scope, $http, $routeParams, FileUploader){
        $scope.campo = {};
        $scope.campos = [];
        $scope.btnSalvar = 'save';


        $scope.getCampos = function(id) {
            $http.get('campo/allbyid/'+id).
                success(function(data, status, headers, config) {
                    $scope.campos = data;
                });
        };

        $scope.getCampos($routeParams.id);

        $scope.save = function() {
            $scope.campo.tela_id = $routeParams.id;
                    $http({
                       method  : $scope.btnSalvar == 'save' ? 'POST' : 'PATCH',
                       url     : $scope.btnSalvar == 'save' ? 'campo' : 'campo/'+ $scope.campo.id,
                       data    : jQuery.param($scope.campo) ,
                       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    }).
                    success(function(response){
                        $scope.campos = {};
                        location.reload();
                    }).
                    error(function(response){
                       alert('Incomplete Form');
                    });
                 }

        $scope.editar = function(id) {
                    $scope.campo = $scope.campos[id];
                    $scope.btnSalvar = 'edit';
                 }

        $scope.delete = function(id) {
                       $http
                            .delete('campo/'+id)
                            .success(function(data){
                              location.reload();
                            })
                            .error(function(data) {
                              alert('Unable to delete');
                           });
                }
  }]);

app.controller('CampoDocController', ['$scope', '$http', function ($scope, $http){
        $scope.passoCampo = {};
        $scope.passoCampos = [];
        $scope.btnSalvar = 'save';

        $scope.getCampos = function(id) {
            $http.get('passocampo/allbyid/'+id).
                success(function(data, status, headers, config) {
                    $scope.campos = data;
                });
        };

        $scope.getAllCampos = function() {
            $http.get('passocampo/all').
                success(function(data, status, headers, config) {
                    console.log(data);
                    $scope.selectCampos = {
                        repeatSelect: null,
                        availableOptions: data
                       };
                });
        };

        $scope.getAllCampos();
        $scope.getCampos($scope.passo.id);

        $scope.save = function() {
            $scope.passoCampo.passo_id = $scope.passo.id;
            $scope.passoCampo.campo_id = $scope.selectCampos.repeatSelect;
                    $http({
                       method  : $scope.btnSalvar == 'save' ? 'POST' : 'PATCH',
                       url     : $scope.btnSalvar == 'save' ? 'passocampo' : 'passocampo/'+ $scope.campo.id,
                       data    : jQuery.param($scope.passoCampo) ,  // pass in data as strings
                       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    }).
                    success(function(response){
                        $scope.campos = {};
                        location.reload();
                    }).
                    error(function(response){
                       alert('Incomplete Form');
                    });
                 }

        $scope.editar = function(id) {
                    $scope.campo = $scope.campos[id];
                    $scope.btnSalvar = 'edit';
                 }

        $scope.delete = function(id) {
                       $http
                            .delete('campo/'+id)
                            .success(function(data){
                              location.reload();
                            })
                            .error(function(data) {
                              alert('Unable to delete');
                           });
                }
  }]);
