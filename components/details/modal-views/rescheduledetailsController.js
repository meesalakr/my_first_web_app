 app.controller('rescheduleModalCtrl', function (reschedule,$uibModalInstance,$scope) {
  
  $scope.reschedule=reschedule;
  
  
  $scope.ok = function () {
    $scope.$close('modal closed');
  };

  
  
 
});