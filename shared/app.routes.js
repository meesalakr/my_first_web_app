app.config(function($stateProvider,$locationProvider){
$locationProvider.html5Mode(true);
$stateProvider
.state('home',{
   url: '/',
   templateUrl: '/components/home/homeView.html',
   controller: 'homeController'
})
.state('form',{
   url: '/form',
   templateUrl: '/components/form/formView.html',
   controller: 'formController'
})
//.state('form.msg',{
//   templateUrl: './partial-views/msg.html'
//})
.state('details',{
   url:'/details',
   templateUrl: '/components/details/detailsView.html',
   controller: 'detailsController'
})
.state('MOTS',{
   url:'/status',
   templateUrl: '/components/MOTS/statusView.html',
   controller: 'statusController'
})
.state('followup',{
   url:'/followup',
   templateUrl: '/components/followup/followupView.html',
   controller: 'followupController'
});
//.otherwise({
  //  redirectTo:'/'
//});
//$locationProvider.html5Mode({enabled: true, requireBase: false});

});
