app.controller("detailsController", function($scope, $http,details,CRs,$uibModal,$log){
    //$scope.templates=[1];
 var arr=[];
  for (x in CRs){
    var l = CRs[x].length;
      for(i=0;i<l;i++){
        arr.push(CRs[x][i])
      }
    }
 $scope.CRs=arr;
  console.log(CRs);
  console.log(arr);
  console.log($scope.CRs);
  $scope.open = function (index) {
    // var parentElem = parentSelector ? 
    //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      // animation: $scope.animationsEnabled,
      // ariaLabelledBy: 'modal-title',
      // ariaDescribedBy: 'modal-body',
      templateUrl: '/components/details/modal-views/CRmodalView.html',
      scope: $scope,
      controller: function($scope){
         $scope.CRs_modal=$scope.CRs[index];
         console.log($scope.CRs_modal)
      },
      size: 'lg'
      // // appendTo: parentElem,
      // resolve: {
      //   CRs_modal: function () {
      //     return $scope.CRs[index];
      //   }
      // }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
    
    // details.getCRdetails().then(function(response){
    //     var arr=[];
    //         for (x in response){
    //         var l = response[x].length;
    //         for(i=0;i<l;i++){
    //           arr.push(response[x][i])
    //          }
    //         }
    //         console.log(arr)
    //     $scope.CRs=arr;
    // }, function(response){
    //     console.log(response);
    // });


// $scope.details=true;
// $scope.loadModal=function(){
//     if($scope.details){
//         return '/components/details/modal-views/CRmodalView.html'
//     }
//     else
//         return '/components/details/modal-views/rescheduleView.html'
// }
// $scope.reschedule=function(){
//     $scope.details=false;
//     //$scope.loadModal();
// }
// $scope.cancel=function(){
//     $scope.details=true;
// }
});
