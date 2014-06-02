var imatch = angular.module('imatch', []);

function theController($scope, $http){

    $http.get('/api/profiles')
        .success(function(data) {
            $scope.profiles = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

}