app.controller("formController",function($scope,$http,form,auth){
// $scope.servers=[];
// $scope.db=[];
// $scope.$watch('CR.servers', function(newValue,oldValue){
//     $scope.count=$scope.servers.length;
// });
//This function runs when the input value(CR.servers) of Application servers changes
$scope.getserverscount=function(v){
    // console.log(v.length)
    $scope.count = v.length;
}
//This function runs when the input value(CR.db) of DB servers changes
$scope.getdbcount=function(v){
    // console.log(v.length)
    $scope.dbcount = v.length;
}
// $scope.$watch('CR.db', function(newValue,oldValue){
//     $scope.dbcount=$scope.db.length;
// });


$scope.environment=['Development','Test','Production','Stage','DR'];
$scope.options=["Yes","No","NA"];
$scope.recount=0;
//var CR =[$scope.MOTSID,$scope.App];

var months = [ "January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December" ];
   
$scope.addCR = function(CR){
console.log($scope.count+$scope.dbcount);
var CR_data = CR;
CR_data.month = months[new Date().getMonth()];
CR_data.recount = 0;
CR_data.reschedule = [];
CR_data.coord = auth.mainuser;
CR_data.totalcount = $scope.count+$scope.dbcount;
  form.postdata('/form',JSON.stringify(CR_data))
  .then(function(response){
    $scope.msg=response;
    $scope.CR={};
    $scope.count = 0; $scope.dbcount=0;
    $("[id=erase]").val('');
  }, function(response){
   console.log(response);
  });
 }

  // auth.doPost('/form', JSON.stringify(CR_data))
  //   .then(function(response) {
  //       console.log(response);
  //       $scope.msg=response.data;
  //       $scope.CR={};
  //       $scope.count = 0; $scope.dbcount=0;
  //       // CRNO='';$scope.MOTSID='';$scope.selectedEnv='';$scope.App='';$scope.servers='';$scope.db='';
  //       // $scope.AppVal='';$scope.DBVal='';$scope.approvers='';$scope.chatroom='';$scope.startdate='';
  //       // $scope.enddate='';$scope.to=''; $scope.Cc='';$scope.startdate=$scope.enddate='';
  //       $("[id=erase]").val('');
  //   },
  //   function(response) {
  //       console.log(response);
  //   });
    
});

