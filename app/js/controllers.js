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
			fillColor : "rgba(26,188,156,0.5)",
			strokeColor : "#169d82",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : price
		}
    ]
  };

		
	});

  }])

  .controller('tickerCtrl', ['$scope', '$http',function($scope, $http) {

  	$scope.jsonSeter = function(key){
	console.log(key);
}

$scope.imgName = function(key){
	 var imageName = key.slice(0, -4);


	 var formatImageName = 'img/'+ imageName +'.png';
	 console.log(formatImageName, $scope.ticker[key] );
	 
	 return formatImageName;
}

  $http.get('../server/ticker.php').success(function(data){

		$scope.ticker = data;


		console.log('tickerData:', $scope.ticker);

		var coinBtc = {};
		var coinLtc = {};
		var coinCny = {};
		var coinNew = {};

		for(var key in $scope.ticker) {

			if(key.slice(-3) == 'btc'){
   					 	coinBtc[key] = $scope.ticker[key];
   			}else if(key.slice(-3) == 'ltc'){
   				coinLtc[key] = $scope.ticker[key];
   		   }else if(key.slice(-3) == 'cny'){
   				coinCny[key] = $scope.ticker[key];
   		   }else{
   		   		coinNew[key] = $scope.ticker[key];
   		   }
		}	

		

		// console.log('coinBtc:', coinBtc);
		// console.log('coinLtc:', coinLtc);
		// console.log('coinCny:', coinCny);
		// console.log('coinnew:', coinNew);

		$scope.coinBtc = coinBtc;
		$scope.coinLtc = coinLtc;
		$scope.coinCny = coinCny;
		$scope.marketArray = coinBtc;
			
		$scope.coinSeter = function(key){
			switch(key)
			{
			case 'cny':
			  $scope.marketArray =  $scope.coinCny;
			  break;
			case 'ltc':
			  $scope.marketArray = $scope.coinLtc;
			  break;
			default:
			  $scope.marketArray = $scope.coinBtc;
			}
		};

		
	});

  }]);

  function HeaderController($scope, $location){ 
    	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}