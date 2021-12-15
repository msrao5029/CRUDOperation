<!DOCTYPE html>
<html ng-app="myapp">

<head>
    <title>This is Sample application</title>
</head>

<body ng-controller="searchcontroller">
    <form>
        <div class="col-sm-6">
            <div ng-include="'src/app/search/views/seach.html'"></div>
        </div>
        <div class="col-sm-6">
            <div ng-include="'src/app/search/views/disaplayGrid.html'"></div>
        </div>
        <!-- {{hex}} -->
    </form>
    <!-- <div ng-include="'table.html'"></div> -->
</body>
<script type="text/javascript" src="node_modules/angular/angular.js"></script>
<script type="text/javascript" src="src/app/search/controllers/searchController.js"></script>
<script type="text/javascript" src="src/app/search/services/searchService.js"></script>

<script type="text/javascript" src="app.js"></script>
<link rel="stylesheet" type="text/css" href="main.css" media=”screen” />

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
    <h3 align="center">AngularJS-Autocomplete Textbox</h3>
    <div>
        <label>Enter Name</label>
        <input type="text" name="country" id="country" ng-model="country" ng-keyup="complete(country)"
            class="form-control" />
        <ul class="list-group" ng-model="hidethis" ng-hide="hidethis">
            <li class="list-group-item" ng-repeat="countrydata in filterCountry" ng-click="fillTextbox(countrydata)">
                {{countrydata}}</li>
        </ul>
        <div>
            <!-- <input type="button" value="Submit" ng-click="formSubmit(countrydata)"/> -->
            <button ng-click="formSubmit()">Submit</button>
        </div>
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
//app.controller("searchcontroller", function($scope,random, stadtMobilRates){ 
    app.controller('searchcontroller', ['$scope', 'random', 'stadtMobilRates', function($scope, random, stadtMobilRates) {
 
    debugger;
   // $scope.hex = random.generate();
  // var stadtmobilRates = stadtMobilRates.LoadData();
   // $scope.loadData = stadtMobilRates.LoadData();
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
     $scope.formSubmit = function(){  
        $scope.search = {};
        debugger;
       // $scope.search[ $scope.key ] = $scope.country;
       // const result = $scope.countryList.filter(s => s.includes($scope.country));
        var text = $scope.countryList.filter(function (val) {
            if(val.name===$scope.country) {
             return val;
            }
          });
          //return text;
        //console.log( $scope.search );
        $scope.countryList.push(text[0])
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
---------------------
<div class="container" style="width:500px;">
    <h3 align="center">Grid display</h3>
    <div class="row">
        <div class="col-sm-4" style="font-weight:bold">Name</div>
        <div class="col-sm-4" style="font-weight:bold">Salary</div>
      </div>
    <div class="row" ng-repeat="countrydata in countryList">
        <div class="col-sm-4">{{countrydata.name}}</div>
        <div class="col-sm-4">{{countrydata.salary}}</div>
      </div>
</div>
