app.controller("detailsController", function($scope, $http,details){
    //$scope.templates=[1];
    details.getCRdetails().then(function(response){
        var arr=[];
            for (x in response){
            var l = response[x].length;
            for(i=0;i<l;i++){
              arr.push(response[x][i])
             }
            }
            console.log(arr)
        $scope.CRs=arr;
    }, function(response){
        console.log(response);
    });


$scope.details=true;
$scope.loadModal=function(){
    if($scope.details){
        return '/components/details/modal-views/CRmodalView.html'
    }
    else
        return '/components/details/modal-views/rescheduleView.html'
}
$scope.reschedule=function(){
    $scope.details=false;
    //$scope.loadModal();
}
$scope.cancel=function(){
    $scope.details=true;
}
});
