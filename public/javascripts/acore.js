var imatch = angular.module('imatch', []);

function theController($scope, $http){

    $scope.editingProfile = false;

    //get all the profiles
    $http.get('/api/profiles')
        .success(function(data) {
            $scope.profiles = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });


    //get just the user's profile
    $http.get('/api/myprofile')
        .success(function(data) {
            $scope.myprof = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.updateProfile = function() {
        $http.post('/api/updateProfile', $scope.myprof)
            .success(function(data) {
                //hide the edit form?

                //$scope.formData = {}; // clear the form so our user is ready to enter another
                //$scope.myprof = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.uploadImage = function() {
        var fb = $('#fb');
        var f = fb[0].files[0];

            var fd = new FormData();
            fd.append('uploadFile', f);
            $http.post('/api/postimage', fd,
                {transformRequest: angular.identity, headers: {'Content-Type': undefined}})
                .success(function (data) {
                    //hide the edit form?
                    $scope.uploadingImage = false;
                    //$scope.img = data;
                    console.log(data);

                    //need to set "hasImage" in profile and then show image somehow?


                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

    };

}