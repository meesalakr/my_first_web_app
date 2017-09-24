app.config(function($stateProvider,$locationProvider){
$locationProvider.html5Mode(true);
$stateProvider
.state('home',{
   url: '/',
   templateUrl: '/components/home/homeView.html',
   controller: 'homeController'
   // resolve:{
   //    piechartdata: function(){

   //    },
   //    columnchartdata:function(){

   //    }
   // }
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
   controller: 'detailsController',
   resolve:{
      CRs: function(details){
         return details.getCRdetails();
      }
   }
})
.state('MOTS',{
   url:'/status',
   templateUrl: '/components/MOTS/statusView.html',
   controller: 'statusController',
   resolve:{
      MOTSdetails: function(track){
         return track.getMOTSdetails();
      }
   }
})
.state('followup',{
   url:'/followup',
   templateUrl: '/components/followup/followupView.html',
   controller: 'followupController'
})
.state('approval',{
   url:'/approval',
   templateUrl: '/components/Approvals/approvalView.html',
   controller: 'approvalsController'
});
//.otherwise({
  //  redirectTo:'/'
//});
//$locationProvider.html5Mode({enabled: true, requireBase: false});

});
