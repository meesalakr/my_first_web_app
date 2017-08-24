var app=angular.module("myApp",["ui.router",'ui.bootstrap']);

app.run(function($rootScope,$window,auth){
     auth.isloggedIn().then(function(response){
        console.log(response.msg);
        $rootScope.mainuser = auth.mainuser;
     }, function(response){
        console.log(response);
        $window.location.href= '/login';
     })


//  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){ 
//     auth.isloggedIn().then(function(response){
//        console.log(response);
//        $rootScope.mainuser=auth.mainuser;
//     },function(response){
//         console.log(response);
//        $window.location.href= '/login';
//     });
// })
});


app.controller("myController",function($scope,$location,$window,auth){
    
 $scope.logout = function(){
   $window.location.href = '/logout'
 }
});
