app.factory('auth', function($http,$q){
    var obj = {};
    obj.isloggedIn = function(){
        var deferred = $q.defer();
        $http.get('/authenticate').then(function(response){
            console.log(response.data.name)
            obj.mainuser = response.data.name;
            obj.mainuser_id = response.data.id;
            obj.mainuser_mail = response.data.mail;
            deferred.resolve({msg:"successfully authenticated"});
        }, function(response){
            deferred.reject({msg:"session expired.Relogin again"});
        });
        return deferred.promise;
    }
    
    return obj;
});

app.factory('put', function($http,$q){
    var obj = {};
    obj.putdata = function(ep,data){
      var deferred = $q.defer();
      $http.put(ep,data).then(function(response){
         deferred.resolve(response.data);
      }, function(response){
        deferred.reject(response.data);
      });
      return deferred.promise;
    }
    return obj;
});

app.factory('form', function($http,$q){
    var obj = {};
    obj.postdata = function(ep,data){
      var deferred = $q.defer();
      $http.post(ep,data).then(function(response){
         deferred.resolve(response.data);
      }, function(response){
        deferred.reject(response.data);
      });
      return deferred.promise;
    }
    return obj;
});

app.factory('details',  function($http,$q){
  var obj = {};
  obj.getCRdetails = function(){
    var deferred=$q.defer();
     $http.get('/CRdetails').then(function(response){
          deferred.resolve(response.data);
     }, function(response){
          deferred.reject(response.data)
     });
     return deferred.promise;
  }
  return obj;
})

app.factory('track', function($http,$q){
  var obj={};
  obj.getMOTSdetails = function(){
    var deferred=$q.defer();
    $http.get('/MOTSdetails').then(function(response){
        deferred.resolve(response.data);
    }, function(response){
        deferred.reject(response.data);
    });
    return deferred.promise;
  }
  return obj;
  
})

app.factory('chartService', function($q, $rootScope, $window){
  var deferred = $q.defer();
  //Load Google charts API asynchronously
  $window.google.charts.load('current',{
   packages:['corechart'],
   callback: function(){
      //when loaded, trigger the resolve
      //but inside an $apply as the event happens
      //outside of AngularJS lifecycle
      $rootScope.$apply(function(){
         deferred.resolve();
      });
   }
  });
  //Returns the promise object for he directive
   return deferred.promise;
})