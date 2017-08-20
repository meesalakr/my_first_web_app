app.controller('statusController', function($scope,$http,track,put){
  
 track.getMOTSdetails().then(function(response){
    var arr = [];
   for(x in response){
       arr.push(response[x]);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    }
    $scope.MOTS = angular.copy(arr);
    console.log($scope.MOTS);
    angular.forEach(arr, function(value,key){
     value.updateseditor = false;
     value.dateeditor=false;
   });
    $scope.MOTS_add=arr;
    
    }, function(response){
    console.log(response);
   });
  

   $scope.postupdates = function(){
     console.log($scope.MOTS_add);
     console.log($scope.MOTS);
     var obj = {};
   angular.forEach($scope.MOTS_add, function(value,key){
    
    if((value.dailyupdates!=$scope.MOTS[key].dailyupdates) || 
        (value.Plannedfollowupdate!=$scope.MOTS[key].Plannedfollowupdate) ||
         (value.RAG!=$scope.MOTS[key].RAG) || 
         (value.responsereceived!=$scope.MOTS[key].responsereceived))
    {
      obj[value.MOTSID] = value;
    }
    
    });

    console.log(obj);

    if(angular.equals(obj, {})){
        console.log("No changes made");
    }
    else{
        put.putdata('/updateMOTS',JSON.stringify(obj)).then(function(response){
       console.log(response);
   }, function(response){
       console.log(response);
   })      
    }
   }


   
   

  $scope.compliant_per = 100;
  $scope.CR_per=100;

  $scope.editupdatecell = function (index) {
    $scope.MOTS_add[index].updateseditor = ($scope.MOTS_add[index].updateseditor)? false: true;
    }
  $scope.editdatecell = function (index) {
    $scope.MOTS_add[index].dateeditor = ($scope.MOTS_add[index].dateeditor)? false: true;
    }

  //  $scope.doneEditing = function (item) {
  //   $scope.editing = false;
    
    //dong some background ajax calling for persistence...
    // };

});