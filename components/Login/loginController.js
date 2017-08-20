var app=angular.module("loginApp",["ui.router"]);

app.config(function($stateProvider,$locationProvider){
$locationProvider.html5Mode(true);
$stateProvider
.state('login',{
   url: '/',
   templateUrl: '/components/Login/loginView.html',
   controller: 'loginController'
})
.state('signup',{
   url: '/signup',
   templateUrl: '/components/Login/signupView.html'
})
.state('forgot',{
   url: '/forgot_pw',
   templateUrl: '/components/Login/forgotView.html',
   controller: ''
})
});

app.controller("loginController",function($scope,$location,$rootScope,auth,$window,form){
  
   $scope.login = function(u){
      form.postdata('/login/signin',u)
      .then(function(response){
        if(response.isAuthorised){
            console.log(response.msg);            
            $window.location.href = '/main'
         }
         else{
            $scope.msg = response.msg;
            $scope.val = !response.isAuthorised;
         }
      }, function(response){
         console.log(response);
      });
    }

   //    auth.doPost('/login/signin',u)
   //    .then(function(response){
   //       if(response.data.isAuthorised){
   //          console.log(response.data.msg);            
   //          $window.location.href = '/main'
   //       }
   //       else{
   //          $scope.msg = response.data.msg;
   //          $scope.val = !response.data.isAuthorised;
   //       }
   //    },function(response){
   //       console.log(response.data);
   //    })
  

});
