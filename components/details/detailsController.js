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
 
  //Function when called opens modal dialog
  $scope.open = function (CR) {
    var modalInstance = $uibModal.open({
      templateUrl: '/components/details/modal-views/CRmodalView.html',
      size: 'lg',
      controller: 'ModalInstanceCtrl',
      // appendTo: parentElem,
      resolve: {
        CR: function () {
          return CR;
        }
      }
    });

    modalInstance.result.then(function (msg) {
      console.log(msg)
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openresch = function (CR) {
    var modalInstance = $uibModal.open({
      templateUrl: '/components/details/modal-views/rescheduledetailsView.html',
      size: 'lg',
      controller: 'rescheduleModalCtrl',
      // appendTo: parentElem,
     resolve: {
        reschedule: function () {
          return CR.reschedule;
        }
      }
    });

     modalInstance.result.then(function (msg) {
      console.log(msg)
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  };
    

});
