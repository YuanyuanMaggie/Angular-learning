(
  function () {
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
      var toBuy = this;

      toBuy.buyList = ShoppingListCheckOffService.getBuyItems();
      toBuy.buyThisItem = function (index) {
        ShoppingListCheckOffService.buyItem(index);
      }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
      var bought = this;
      bought.boughtList = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
      var service = this;
      //initial
      var toBuy = [{name: "cookies", quantity: 10},
      {name: "coffee", quantity: 12},
      {name: "water", quantity: 30},
      {name: "meat", quantity: 3},
      {name: "coke", quantity: 50},
      {name: "shoes", quantity: 1}];
      var alreadyBought = [];

      service.buyItem = function(itemIndex){
        var item = toBuy.splice(itemIndex,1)[0];
        alreadyBought.push(item);
      }

      service.getBuyItems = function(){
        return toBuy;
      }

      service.getBoughtItems = function(){
        return alreadyBought;
      }
    }
  }
)();
