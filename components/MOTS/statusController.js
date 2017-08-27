app.controller('statusController', function($scope,$http,MOTSdetails,$uibModal,put){
  //converting the MOTSdetails from object format to array format
  var arr = [];
  for(x in MOTSdetails){
       arr.push(MOTSdetails[x]);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    }   
  //preserving the MOTSdetails loaded initially in $scope.MOTS
    $scope.MOTS = angular.copy(arr);
    console.log($scope.MOTS);
  //looping through each element of array and adding the required properties to be shown in the view 
    angular.forEach(arr, function(value,key){
        y =(value.serversinCRs*100)/(value.serversassigned);
    value.CR_per = value.compliant_per = y;
     value.updateseditor = false;
     value.dateeditor=false;
   });
  //assigning the modified array to scope object named MOTS_add
    $scope.MOTS_add=arr;
    
  //===============================================================================================//
  

   $scope.postupdates = function(){
     console.log($scope.MOTS);
     //preserving the updated array by copying it to MOTS_send  
     var MOTS_send = angular.copy($scope.MOTS_add);
     var obj = {};
     //looping through the array and identifying the updated MOTS
   angular.forEach(MOTS_send, function(value,key){
    if((value.dailyupdates!=$scope.MOTS[key].dailyupdates) || 
        (value.Plannedfollowupdate!=$scope.MOTS[key].Plannedfollowupdate) ||
         (value.RAG!=$scope.MOTS[key].RAG) || 
         (value.responsereceived!=$scope.MOTS[key].responsereceived))
      //Injecting the updated MOTS values to the obj  
    {
      obj[value.MOTSID] = value;
      obj[value.MOTSID].Statuslastdate = new Date();
      $scope.MOTS_add[key].Statuslastdate= new Date();

    }
    
    });
    //deleting the additional properties that are added initially
    for(x in obj){
        delete obj[x]['dateeditor'];
        delete obj[x]['updateseditor'];
        delete obj[x]['CR_per'];
        delete obj[x]['compliant_per'];
        console.log(obj[x]);
    }

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
 //==================================================================================================//
   //Modal dialog function

   $scope.open = function (MOTS) {
    var modalInstance = $uibModal.open({
      templateUrl: '/components/MOTS/modal-views/MOTSmodalView.html',
      size: 'lg',
      controller: 'MOTSmodalController',
      // appendTo: parentElem,
      resolve: {
        MOTS: function () {
          return MOTS;
        }
      }
    });

    modalInstance.result.then(function (msg) {
      console.log(msg)
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };




});