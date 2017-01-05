(
  function () {
    'use strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController',LunchController);

    LunchController.$inject = ['$scope'];
    function LunchController($scope){
      $scope.food = "";
      $scope.count = 0;
      
      $scope.checkFood = function(){
        var resultList = $scope.food.split(',');
        $scope.count = 0;
        for(var i=0; i<resultList.length;i++){
          if(resultList[i].trim().length>0){
            $scope.count++;
          }
        }

        if($scope.count==0){
          $scope.count = -1;
        }
      }
    }
  }
)();
