/**
 * @ngdoc function
 * @name yoExemploApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yoExemploApp
 */
app.controller('MensagemController', ['$scope', '$http', 'API', function ($scope, $http, API){
        $scope.mensagem = {};
        $scope.mensagems = [];
        $scope.btnSalvar = 'save';

        $scope.getMensagens = function(){
            $http.get(API.url + 'mensagem/all').
                success(function(data, status, headers, config) {
                    $scope.mensagems = data;
                });
        };

        $scope.getMensagens();

        $scope.save = function() {
                    $http({
                       method  : $scope.btnSalvar == 'save' ? 'POST' : 'PATCH',
                       url     : $scope.btnSalvar == 'save' ? 'mensagem' : 'mensagem/'+ $scope.mensagem.id,
                       data    : jQuery.param($scope.mensagem) ,  // pass in data as strings
                       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    }).
                    success(function(response){
                        $scope.mensagems = {};
                        location.reload();
                    }).
                    error(function(response){
                       alert('Incomplete Form');
                    });
                 }

        $scope.editar = function(id) {
                    $scope.mensagem = $scope.mensagems[id];
                    $scope.btnSalvar = 'edit';
                 }

        $scope.delete = function(id) {
                       $http
                            .delete('mensagem/'+id)
                            .success(function(data){
                              location.reload();
                            })
                            .error(function(data) {
                              alert('Unable to delete');
                           });
                }
  }]);

app.controller('MensagemDocController', ['$scope', '$http', 'API', function ($scope, $http, API){
        $scope.passoMensagem = {};
        $scope.passoMensagens = [];
        $scope.btnSalvar = 'save';

        $scope.getMensagens = function(id) {
            $http.get(API.url + '/passomensagem/allbyid/'+id).
                success(function(data, status, headers, config) {
                    $scope.mensagens = data;
                    $scope.tags = data;
                });
        };

        $scope.getAllMensagens = function() {
            $http.get(API.url + '/passomensagem/all').
                success(function(data, status, headers, config) {
                    $scope.selectMensagens = {
                        repeatSelect: null,
                        availableOptions: data
                       };
                });
        };

        $scope.getAllMensagens();
        $scope.getMensagens($scope.passo.id);

        $scope.loadTags = function(query) {
            return $http.get('passomensagem/all');
        };

        $scope.save = function() {
            $scope.passoMensagem.passo_id = $scope.passo.id;
            $scope.passoMensagem.mensagem_id = $scope.selectMensagens.repeatSelect;

            $scope.tt = [];
            angular.forEach($scope.tags, function(value, key){
                this.push({name: 'mensagem_id[]', value: value.id})
            }, $scope.tt );

            $scope.tt.push({name: 'passo_id', value: $scope.passo.id});

                    $http({
                       method  : $scope.btnSalvar == 'save' ? 'POST' : 'PATCH',
                       url     : $scope.btnSalvar == 'save' ? 'passomensagem' : 'passomensagem/'+ $scope.mensagem.id,
                       data    : jQuery.param($scope.tt) ,  // pass in data as strings
                       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    }).
                    success(function(response){
                        $scope.mensagems = {};
                        location.reload();
                    }).
                    error(function(response){
                       alert('Incomplete Form');
                    });
                 }

        $scope.editar = function(id) {
                    $scope.mensagem = $scope.mensagems[id];
                    $scope.btnSalvar = 'edit';
                 }

        $scope.delete = function(id) {
                       $http
                            .delete('mensagem/'+id)
                            .success(function(data){
                              location.reload();
                            })
                            .error(function(data) {
                              alert('Unable to delete');
                           });
                }
  }]);
