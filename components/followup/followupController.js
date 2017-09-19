app.controller('followupController', function($scope,$http,fileUpload,$document,IDdetails){
     $scope.submit = function(){
          console.log("sent");
           var file = $scope.myFile;
           var uploadUrl = '/upload_init';
           var field = $scope.form;
          fileUpload.uploadFileToUrl(file,field, uploadUrl).then(function(response){
            console.log(response);
            $scope.form='';
            angular.element($document[0].querySelector('#exampleInputFile')).val('');
          }, function(response){
            console.log(response)
          });
           
        }

    $scope.getIDdetails = function(){
        IDdetails.getID_details($scope.ID).then(function(response){
          console.log(response);
          $scope.MOTSID = response.MOTSID;
          $scope.App = response.App;
          console.log(angular.equals(response.Initial,{}))
         if(angular.equals(response.Initial,{})){
            $scope.initial = "None"  
         }
         else{
            $scope.initial = response.Initial.date
         }
          if(response.Reminder.length == 0){
            $scope.Reminder = "None"
         }
         else{
            $scope.Reminder = response.Reminder.date
         }
          if(angular.equals(response.Escalation,{})){
            $scope.Escalation = "None"
         }
         else{
            $scope.Escalation = response.Escalation.date
         }
        }, function(response){
          console.log(response);
        })
    }
    
});