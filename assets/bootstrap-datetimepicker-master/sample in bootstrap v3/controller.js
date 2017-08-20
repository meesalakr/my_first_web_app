var app=angular.module("myApp",[]);

app.controller('myController', function($scope){
  $scope.cocktail='Long Island Iced tea';
  $scope.beer='Budwiser Magnum';
  $scope.vodka='Magic Moments';
  $scope.drinks={beer: 'KF', brandy: 'Imperial Blue', Whisky: 'Royal Stag', Rum: 'Old Monk'}
});

app.directive('myDirective', function(){
  return{
    scope: {},
    restrict:'EA',
    templateUrl:'./view.html'
  }
});
