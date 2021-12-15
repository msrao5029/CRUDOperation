<!DOCTYPE html>
<html ng-app="myapp">

<head>
    <title>This is Sample application</title>
</head>

<body ng-controller="searchcontroller">
    <h2>Student Details</h2>
    <form>
        <div class="col-sm-6">
            <div ng-include="'src/app/search/views/seach.html'"></div>
        </div>
        <div class="col-sm-6">
            <div ng-include="'src/app/search/views/seach.html'"></div>
        </div>
        <!-- {{hex}} -->
    </form>
    <!-- <div ng-include="'table.html'"></div> -->
</body>
<script type="text/javascript" src="node_modules/angular/angular.js"></script>
<script type="text/javascript" src="src/app/search/controllers/searchController.js"></script>
<script type="text/javascript" src="src/app/search/services/searchService.js"></script>

<script type="text/javascript" src="app.js"></script>

<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->
<style>  
    li{  
         cursor:pointer;  
    }  
    li:hover  
    {  
         background-color:#f9f9f9;  
    }  
    </style>  

</html>
--------------------------------------
<div class="container" style="width:500px;">
    <h3 align="center">AngularJS Tutorial - Make Autocomplete Textbox</h3>
    <div>
        <label>Enter Country Name</label>
        <input type="text" name="country" id="country" ng-model="country" ng-keyup="complete(country)"
            class="form-control" />
        <ul class="list-group" ng-model="hidethis" ng-hide="hidethis">
            <li class="list-group-item" ng-repeat="countrydata in filterCountry" ng-click="fillTextbox(countrydata)">
                {{countrydata}}</li>
        </ul>
    </div>
</div>
-----------------
//var app = angular.module('myapp', []);
app.factory('demo', function() {
  this.myFunc = function (x) {
     return x.toString(8);
   }
});

app.factory('random', function() {
    var randomObject = {};
    var number = Math.floor(Math.random() * 100);
    randomObject.generate = function() {
        return number;
    };
    return randomObject;
});

app.factory('stadtMobilRates', function($http) {
    var promise = null;
  
    return function() {
      if (promise) {
        // If we've already asked for this data once,
        // return the promise that already exists.
        return promise;
      } else {
        promise = $http.get('src/app/search/services/data.json');
        return promise;
      }
    };
   });
   -----------------------
   {  
    "employee": [
    {  
        "name":       "madhu",   
        "salary":      3500 
    } ,
    {  
        "name":       "sudhan",   
        "salary":      5500  
    },
    {  
        "name":       "manne",   
        "salary":      6500   
    }
 ]
}  
----------------------
var app = angular.module("myapp",[]);  
    app.controller('searchcontroller', ['$scope', 'random', 'stadtMobilRates', function($scope, random, stadtMobilRates) {
    stadtMobilRates().then(function(data) {
        $scope.countryList = data.data.employee;
      });
     $scope.complete = function(string){  
          $scope.hidethis = false;  
          var output = [];  
          angular.forEach($scope.countryList, function(country){  
               if(country.name.toLowerCase().indexOf(string.toLowerCase()) >= 0)  
               {  
                    output.push(country.name);  
               }  
          });  
          $scope.filterCountry = output;  
     }  
     $scope.fillTextbox = function(string){  
          $scope.country = string;  
          $scope.hidethis = true;  
     } 
   
}]);  

-----------------------
{
  "name": "angularjs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "live-server"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "angular": "^1.8.2",
    "live-server": "^1.2.1"
  }
}
