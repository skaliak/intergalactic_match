var imatch = angular.module('imatch', []);

function theController($scope, $http){

    $scope.editingProfile = false;
    $scope.notN00b = true;
    toastr.options.positionClass = 'toast-top-left';
    //toastr.info('this is a test toast message');

    //get all the profiles
    $http.get('/api/profiles')
        .success(function(data) {
            $scope.profiles = data;
            //console.log('loaded profiles');
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });


    //get just the user's profile
    $http.get('/api/myprofile')
        .success(function(data) {

            console.log('myprof: ');
            console.log(data);
            if(data == "") {
                console.log('no profile?');
                //if the user doesn't have a profile (data == null?)
                //start the editing right away
                $scope.notN00b = false;
                $scope.editingProfile = true;
                toastr.warn('you need to create a profile before you can view matches');
            }
            else {
                $scope.myprof = data;
		if($scope.myprof.hasimage) {
			console.log('hasimage = true')
		}
		
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.get('/api/me')
        .success(function(data) {
            $scope.me = data;
            //console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.updateProfile = function() {
        //check if userid needs to be associated
        if($scope.myprof.userid == null) {
            $scope.myprof.userid = $scope.me._id;
        }

        $http.post('/api/updateProfile', $scope.myprof)
            .success(function(data) {
                //hide the edit form
                $scope.editingProfile = false;
                //$scope.myprof.hasimage = true;
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.notN00b = true;
                console.log(data);
                toastr.success('Profile saved!');
            })
            .error(function(data) {
                console.log('Error: ' + data);
                toastr.error(data);
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
                    $scope.myprof.hasimage = true;
		    toastr.success('uploaded image!');
		    //$scope.updateProfile();

                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

    };

    $scope.showProfModal = function(p) {
        $scope.profView = p;
        //console.log(p);
        $('#profModal').modal('show');
    };

    $scope.showAboutModal = function() {

        $('#aboutModal').modal('show');
    };

}
