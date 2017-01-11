(
  function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('Api','https://davids-restaurant.herokuapp.com/')
    .directive('foundItems',FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
      var narrow = this;
      narrow.found = [];
      narrow.keyword = "";
      narrow.message = "";
      narrow.search = function(words){
        narrow.found = [];
        if(words.length===0){
          narrow.message = "Nothing found";
        }else{
          var promise = MenuSearchService.getMatchedMenuItems(words);
          promise.then(function (response) {
            console.log("response here");
            if(typeof(response)=== 'undefined' || response.length===0){
              narrow.message = "Nothing found";
            }else{
              narrow.message = "";
              narrow.found = response;
            }
          });
        }
      }

      narrow.removeItem = function(index){
        narrow.found.splice(index,1);
      }
    }

    MenuSearchService.$inject = ['$http','Api','$q'];
    function MenuSearchService($http,Api,$q) {
      var service = this;
      //initial

      service.getMatchedMenuItems = function(searchTerm){
        return $http({
          method:"GET",
          url:(Api + "menu_items.json")
        }).then(function(result){
          console.log("connect API...");
          var foundItems = [];
          var deferred = $q.defer();
          var data  = result.data.menu_items;

          for( let i = 0; i<data.length;i++){
            if(data[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())!=-1){
              foundItems.push(data[i]);
            }
          };
          console.log(foundItems);
          if(foundItems.length>0){
            deferred.resolve(foundItems);
          }else{
            deferred.reject(foundItems);
          }
          return deferred.promise;
        }).catch(function (error) {
            console.log(error);
        });

      }
    }

    function FoundItemsDirective() {
      var ddo = {
        templateUrl:'searchList.html',
        scope:{
          found:'<',
          message:'<',
          onRemove:'&'
        },
        controller:FoundItemsDirectiveController,
        controllerAs:'list',
        bindToController:true
      }
      return ddo;
    }

    function FoundItemsDirectiveController() {
      var list = this;
    }
  }
)();
