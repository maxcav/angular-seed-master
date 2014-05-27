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

  .controller('lineCtrl', ['$scope' , '$http', '$routeParams',function($scope, $http, $routeParams) {

  	var setJson = function(coinValue) {
  		$scope.$emit('LOAD');
	 		$http.get('../server/json.php?coinValue=' + coinValue).success(function(data) {
			$scope.money = data;
			$scope.$emit('UNLOAD');
			$scope.coinValue = coinValue;
			//console.log('money:', $scope.money.data.pop());
			$scope.lastValues = $scope.money.data.pop();
			console.log('lastValues:', $scope.lastValues);


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
				$scope.lastTime = time.pop();
				console.log('lastTime', $scope.lastTime);

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
  }

  	setJson($routeParams.coinValue);

		


  }])

  .controller('tickerCtrl', ['$scope', '$rootScope', '$http', '$filter'  ,function($scope, $rootScope, $http, $filter) {

	$scope.imgName = function(key){
		 var imageName = key.slice(0, -4);
		 var defaultImageName = 'img/default.png';
		 var formatImageName = 'img/'+ imageName +'.png';

		 var img = new Image();
		 img.src = formatImageName;

		 if(img.height != 0) {
		 	return formatImageName;
		 } else {
		 	return defaultImageName;
		 }
	}

	$scope.$emit('LOAD');

  $http.get('../server/ticker.php').success(function(data){

		$scope.ticker = data;
		$scope.$emit('UNLOAD');

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

		
		 console.log('coinBtc:', coinBtc);
		 console.log('coinLtc:', coinLtc);
		 console.log('coinCny:', coinCny);
		 console.log('coinnew:', coinNew);

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
	

	
  }])

  .controller('LoadingCtrl', ['$scope',function($scope) {

	$scope.$on('LOAD', function(){$scope.loading = true});
	$scope.$on('UNLOAD', function(){$scope.loading = false});

	
  }]);

  function HeaderController($scope, $location){ 
    	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}