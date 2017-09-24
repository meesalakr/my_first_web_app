app.controller('approvalsController', function($scope,fileUpload,$document){
    
     $scope.submit = function(){
          console.log("sent");
          console.log($scope.myFile)
           var file = $scope.myFile;
           var uploadUrl = '/converttojson';
           var field = new Date();
          fileUpload.uploadFileToUrl(file,field, uploadUrl).then(function(response){
            console.log(response);
           // $scope.books = response.data;
            }, function(response){
            console.log(response)
          });
           
        }
        
   
});


