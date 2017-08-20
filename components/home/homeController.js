app.controller("homeController",function($scope){
  $scope.pieChartData=[{label: 'Compliant', value: 25},{label: 'Non-Compliant', value: 54}];
  $scope.pieChartConfig={title:'Coordinator Servers Status', firstColumnHeader:'Status', secondColumnHeader:'Servers Count'};
  
});