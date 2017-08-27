app.directive('myDatepicker', function () {
    return {
        retrict:'E',
        replace:true,
        require:'ngModel',
        scope:{},
        template:'<div class="input-group date col-lg-6">'+
          '<input id="erase" class="form-control"  size="16" type="text"  readonly>'+
          '<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>'+
          '</div>',
        // require : 'ngModel',
        link : function (scope, element, attrs,ctrl) {
            
                element.datetimepicker({ 
                    format: 'dd M yyyy - HH:ii p IST',                  
                    autoclose: 1,
                    todayHighlight: 1,
                    forceParse: 0,
                    showMeridian: 1,

                })
                .on('changeDate', function (ev) {
                scope.$apply(function(){
                  ctrl.$setViewValue(ev.date);
                  
                })
              })
           
        }
    }
});


app.directive('pieChart', function(chartService,$window){
   var convert = function(first,second,data){
      var array = [[first,second]];
            for(var i=0; i<data.length;i++){
         array.push([data[i].label, data[i].value]);
      }
      return google.visualization.arrayToDataTable(array);
   };
   return{
      restrict:'A',
      scope:{
         'chartData':'=',
         'chartConfig':'='
      },
      link: function(scope,el,attrs){
         chartService.then(function(){
            var chart = new google.visualization.PieChart(el[0]);
            
            scope.$watch('chartData', function(n,o){
               var config = scope.chartConfig;
               if(n){
                  chart.draw(
                     convert(
                        config.firstColumnHeader,
                        config.secondColumnHeader,n),
                     {title:scope.chartConfig.title, is3D: true, backgroundColor:'#eee',right:0});
               }
            }, true);
         });
      }
   };
});

app.directive('columnChart', function(chartService,$window){
   var convert = function(first,second,third,fourth,data){
      var array = [[first,second,third,fourth]];
            for(var i=0; i<data.length;i++){
         array.push([data[i].label, data[i].Prod,data[i].Non_prod,data[i].Stage]);
      }
      return google.visualization.arrayToDataTable(array);
   };
   return{
      restrict:'A',
      scope:{
         'chartData':'=',
         'chartConfig':'='
      },
      link: function(scope,el,attrs){
         chartService.then(function(){
            var chart = new google.visualization.ColumnChart(el[0]);
            
            scope.$watch('chartData', function(n,o){
               var config = scope.chartConfig;
               if(n){
                  chart.draw(
                    convert(
                        config.firstColumnHeader,
                        config.secondColumnHeader,
                        config.thirdColumnHeader,
                        config.secondColumnHeader,n),
                     {title:scope.chartConfig.title,isStacked: true, backgroundColor:'#eee',left:0});
               }
            }, true);
         });
      }
   };
});

app.directive('angAutofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}]);