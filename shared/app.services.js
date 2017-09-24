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

// app.factory('piechart',function($http,$q){
//   return{
//     getdetails: function(){

//      }
//   }
// });

app.factory('columnchart',function($http,$q,auth){
  return{
   getdetails: function(){
     var deferred=$q.defer();
     $http.get('/columnchart/'+auth.mainuser_id).then(function(response){
          deferred.resolve(response.data);
     }, function(response){
          deferred.reject(response.data)
     });
     return deferred.promise;
     }
  }
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

app.factory('IDdetails',  function($http,$q){
  var obj = {};
  obj.getID_details = function(ID){
    var deferred=$q.defer();
     $http.get('/followup/'+ID).then(function(response){
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

app.service('fileUpload', ['$http','$q' ,function ($http,$q) {
    this.uploadFileToUrl = function(file,field, uploadUrl){
        var deferred = $q.defer();
        var fd = new FormData();
        console.log(file[0]);
        for (var i = 0; i < file.length; i++) {
           fd.append(file[i].name, file[i])
        }
        
        fd.append('field', JSON.stringify(field));
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(response){
            deferred.resolve(response.data);
            for(var x of fd.entries()) {
            fd.delete(x[0]);
         }
        }, function(response){
           deferred.reject(response.data)
        })
        return deferred.promise;
    }
}]);

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
