'use strict';

/* Controllers */

angular.module('myApp.controllers', ['chartjs']).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', ['$scope', '$http',function($scope, $http) {

  $http.get('../server/json.php').success(function(data){

		$scope.money = data;

		console.log('money:', $scope.money);

		var price = new Array();
		var timeDate = new Array();

		for(var i = 0; i<$scope.money.data.length; i++){

			//console.log($scope.money.data[i].price);

			var date = new Date($scope.money.data[i].date * 1000);
			timeDate.push(date);

			price.push($scope.money.data[i].price);
			//console.log(price);
			//console.log(timeDate);
		}	


		
	});

  }])

  .controller('lineCtrl', ['$scope' , '$http',function($scope, $http) {

  $http.get('../server/json.php').success(function(data){

		$scope.money = data;

		console.log('money:', $scope.money);

		var price = new Array();
		var timeDate = new Array();
		var time = new Array();

		for(var i = 0; i<$scope.money.data.length; i++){

			//console.log($scope.money.data[i].price);

			var date = new Date($scope.money.data[i].date * 1000);
			timeDate.push(date.toString());

			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			var formattedTime = hours + ':' + minutes + ':' + seconds;
			time.push(formattedTime);

			price.push($scope.money.data[i].price);
			
		}	

			console.log(price);
			console.log(timeDate);

			 $scope.lineData = {
    labels : time,
    datasets : [
      {
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : price
		}
    ]
  };

		
	});

  }])

  .controller('tickerCtrl', ['$scope', '$http',function($scope, $http) {

  $http.get('../server/ticker.php').success(function(data){

		$scope.ticker = data;


		//console.log('tickerData:', $scope.ticker);

		var coinName = new Array();

		for(var key in $scope.ticker) {
   			 coinName.push(key);
		}	

		console.log('coinName:', coinName);

		$scope.coinName = coinName;
			


		
	});

  }]);