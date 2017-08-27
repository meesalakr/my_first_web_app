app.controller("homeController",function($scope,columnchart){
  
  $scope.pieChartData=[{label: 'Compliant', value: 25},{label: 'Non-Compliant', value: 54}];
  $scope.pieChartConfig={title:'Coordinator Servers Status', firstColumnHeader:'Status', secondColumnHeader:'Compliant Percentage'};

columnchart.getdetails();

  $scope.columnChartData=[
  {label: 'Oct', Prod: 25,Non_prod:25,Stage:11},
  {label: 'Nov', Prod: 35,Non_prod:15,Stage:17},
  {label: 'Dec', Prod: 29,Non_prod:27,Stage:15},
  {label: 'Jan', Prod: 35,Non_prod:30,Stage:10},
  {label: 'Feb', Prod: 47,Non_prod:29,Stage:15},
  {label: 'Mar', Prod: 15,Non_prod:19,Stage:9}
  ];
  $scope.columnChartConfig={title:'Coordinator CRs Status', firstColumnHeader:'Month', secondColumnHeader:'Non-Prod',thirdColumnHeader:'Prod',fourthColumnHeader:'Stage'};
  
});