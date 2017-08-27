 app.controller('MOTSmodalController', function (MOTS,$uibModalInstance,$scope) {
  
 $scope.MOTS_modal=MOTS;
   
  
  $scope.ok = function () {
    $scope.$close('modal closed');
  };
});