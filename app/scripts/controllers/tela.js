/**
 * @ngdoc function
 * @name yoExemploApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yoExemploApp
 */
app.controller('TelaController', ['$scope', '$http','FileUploader', 'API', function ($scope, $http, FileUploader, API){
        $scope.tela = {};
        $scope.telas = [];
        $scope.btnSalvar = 'save';

        $scope.getTelas = function() {
            $http.get(API.url + 'tela/all').
                success(function(data, status, headers, config) {
                    $scope.telas = data;

                    $scope.testes= [];
                    angular.forEach($scope.telas, function(value, key){
                        this.push({id: value.id, titulo: value.titulo,
                                  tag: value.tag, upload: new FileUploader()});
                    }, $scope.testes );

                    $scope.telas = $scope.testes;
                });
        };


        $scope.getTelas();


        $scope.save = function() {
                    $http({
                       method  : $scope.btnSalvar == 'save' ? 'POST' : 'PATCH',
                       url     : $scope.btnSalvar == 'save' ? 'tela' : 'tela/'+ $scope.tela.id,
                       data    : jQuery.param($scope.tela) ,  // pass in data as strings
                       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    }).
                    success(function(response){
                        $scope.telas = {};
                        location.reload();
                    }).
                    error(function(response){
                       alert('Incomplete Form');
                    });
                 }

        $scope.editar = function(id) {
                    $scope.tela = $scope.telas[id];
                    $scope.btnSalvar = 'edit';
                 }

        $scope.delete = function(id) {
                       $http
                            .delete('tela/'+id)
                            .success(function(data){
                              location.reload();
                            })
                            .error(function(data) {
                              alert('Unable to delete');
                           });
                }
        $scope.uploader = new FileUploader();
  }]);

app.controller('TelaDocController', ['$scope', '$http', 'API', function ($scope, $http, API){
        $scope.tela = {};
        $scope.telas = [];
        $scope.btnSalvar = 'save';

        $scope.getTelas = function(id) {
            $http.get(API.url + '/passotela/allbyid/'+id).
                success(function(data, status, headers, config) {
                    $scope.tags = data;
                    $scope.telas = data;
                });
        };

        $scope.getAllTelas = function() {
            $http.get(API.url + '/tela/all').
                success(function(data, status, headers, config) {
                    $scope.selectTelas = {
                        repeatSelect: null,
                        availableOptions: data
                       };
                });
        };

        $scope.getAllTelas();
        $scope.getTelas($scope.passo.id);

        $scope.loadTags = function(query) {
            return $http.get('tela/all');
        };



        $scope.save = function() {

            $scope.tt = [];
            angular.forEach($scope.tags, function(value, key){
                this.push({name: 'tela_id[]', value: value.id})

            }, $scope.tt );
            console.log($scope.tt.push({name: 'passo_id', value: $scope.passo.id}));

            $scope.tela.passo_id = $scope.passo.id;
            $scope.tela.tela_id = $scope.selectTelas.repeatSelect;
                    $http({
                       method  : $scope.btnSalvar == 'save' ? 'POST' : 'PATCH',
                       url     : $scope.btnSalvar == 'save' ? 'passotela' : 'passotela/'+ $scope.mensagem.id,
                       //data    : jQuery.param($scope.tela) ,  // pass in data as strings
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
                    $scope.tela = $scope.mensagems[id];
                    $scope.btnSalvar = 'edit';
                 }

        $scope.delete = function(passo_id, tela_id) {
                       $http
                            .delete('passotela/'+passo_id+'/'+tela_id)
                            .success(function(data){
                              location.reload();
                            })
                            .error(function(data) {
                              alert('Unable to delete');
                           });
                }
  }]);
