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

          if(angular.isObject(response)){
            $scope.MOTSID = response.MOTSID;
            $scope.App = response.App;
            $scope.initial =response.Initial;
            $scope.Reminder = response.Reminder;
            $scope.Escalation = response.Escalation;
            $scope.isObjectEmpty = function(card){
         return Object.keys(card).length === 0;
         }
         $scope.isArrayEmpty = function(card){
         return card.length === 0;
         }
          }
          else{
            $scope.msg = response;
          }
          
        }, function(response){
          console.log(response);
        })
    }
    
});