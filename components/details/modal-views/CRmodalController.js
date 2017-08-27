 app.controller('ModalInstanceCtrl', function (CR,$uibModalInstance,form,$scope,$compile,$templateCache,$document) {
  
  $scope.CRs_modal=CR;
  $scope.CRs_modal['allservers']=($scope.CRs_modal.servers.concat($scope.CRs_modal.db));
  
  $scope.CRs_modal['allserverscount']=$scope.CRs_modal.allservers.length;
  
  $scope.reschedule = function () {
    var body = $compile($templateCache.get('rescheduleView.html'))($scope);
    var footer=$compile($templateCache.get('footer.html'))($scope);
    angular.element($document[0].querySelector('.modal-body')).replaceWith(body);
    angular.element($document[0].querySelector('.modal-footer')).replaceWith(footer);
    // $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.ok = function () {
    $scope.$close('modal closed');
  };

  $scope.CR_resc = angular.copy($scope.CRs_modal);
  
  $scope.rescheduleCR = function(x){
    console.log(x)
    var obj={};
    obj['ATTUID']=x.ATTUID;
    obj['CRNO']=x.CRNO;
    obj['mailedto']=x.Cc + ',' + x.to;
    obj['allservers']=x.allservers;
    obj['allserverscount']=x.allserverscount;
    obj['approvers']=x.approvers;
    obj['rescheduleddate']=new Date();
    obj['newstartdate']=x.newstartdate;
    obj['newenddate']=x.newenddate;
    console.log(obj);
    console.log(obj.mailedto)

    form.postdata('/reschedule',obj).then(function(response){

    }, function(response){

    })
    
    
  }
});