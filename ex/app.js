(function () {
  'use strict';
  // angular.module('myFirstApp',[])
  // .controller('myFirstController',function($scope){
  //   $scope.name = "ya";
  // });
  angular.module('NameCalculator',[])
  .controller('NameCalculatorController',function($scope){
    $scope.name = "";
    $scope.totalValue = 0;

    $scope.displayNumeric = function(){
      var totalNameValue =
      calculatNumbericForString($scope.name);
      $scope.totalValue = totalNameValue;
    }

    function calculatNumbericForString(name){
      var totalStringValue = 0;
      for(var i = 0; i<name.length;i++){
        totalStringValue += name.charCodeAt(i);
      }
      return totalStringValue;
    }
  })

})();
