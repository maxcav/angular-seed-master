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

  .controller('lineCtrl', ['$scope' , '$http', '$routeParams','$rootScope',function($scope, $http, $routeParams, $rootScope) {

  	var setJson = function(coinValue) {
  		$scope.$emit('LOAD');
	 		$http.get('../server/json.php?coinValue=' + coinValue).success(function(data) {
			$scope.money = data;
			$scope.$emit('UNLOAD');
			$scope.coinValue = coinValue;
			$scope.lastValues = $scope.money.data.pop();
			console.log('lastValues:', $scope.lastValues);
			$rootScope.$broadcast('coinValue',coinValue);

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

	
  }])

   .controller('WikiCtrl', ['$scope', '$rootScope', function($scope , $rootScope) {
   		$scope.$on("coinValue",function() {
   		
   		
	   
	   		var wikiSearch = $scope.coinValue.slice(0, -4);
	      switch(wikiSearch)
				{
				case 'aur':
				  wikiSearch =  'Auroracoin';
				  break;
				case 'ac':
				  wikiSearch =  'Asiacoin';
				  break;
				case 'bc':
				  wikiSearch =  'Blackcoin';
				  break;
				 case 'bqc':
				  wikiSearch =  'BBQcoin';
				  break;
				  case 'btb':
				  wikiSearch =  'Bitbar';
				  break;
				  case 'buk':
				  wikiSearch =  'CryptoBuck';
				  break;
				  case 'c2':
				  wikiSearch =  'Coin2.0';
				  break;
				  case 'cdc':
				  wikiSearch =  'Cloudcoin';
				  break;
				  case 'cmc':
				  wikiSearch =  'Cosmoscoin';
				  break;
				  case 'cnc':
				  wikiSearch =  'Chinacoin';
				  break;
				  case 'comm':
				  wikiSearch =  'CommunityCoin';
				  break;
				  case 'dgc':
				  wikiSearch =  'Digitalcoin';
				  break;
				  case 'doge':
				  wikiSearch =  'Dogecoin';
				  break;
				  case 'drk':
				  wikiSearch =  'Darkcoin';
				  break;
				  case 'flt':
				  wikiSearch =  'Fluttercoin';
				  break;
				  case 'frc':
				  wikiSearch =  'Freicoin';
				  break;
				  case 'ftc':
				  wikiSearch =  'Feathercoin';
				  break;
				  case 'kdc':
				  wikiSearch =  'Klondikecoin';
				  break;
				  case 'ltc':
				  wikiSearch =  'Litecoin';
				  break;
				  case 'max':
				  wikiSearch =  'Maxcoin';
				  break;
				  case 'mec':
				  wikiSearch =  'Megacoin';
				  break;
				  case 'mint':
				  wikiSearch =  'MintCoin';
				  break;
				  case 'mmc':
				  wikiSearch =  'Memorycoin';
				  break;
				  case 'nec':
				  wikiSearch =  'Neocoin';
				  break;
				  case 'nmc':
				  wikiSearch =  'Namecoin';
				  break;
				  case 'nxt':
				  wikiSearch =  'Nextcoin';
				  break;
				  case 'ppc':
				  wikiSearch =  'Peercoin';
				  break;
				  case 'prt':
				  wikiSearch =  'Particlecoin';
				  break;
				  case 'ptc':
				  wikiSearch =  'Pesetacoin';
				  break;
				  case 'qrk':
				  wikiSearch =  'Quark';
				  break;
				  case 'src':
				  wikiSearch =  'Securecoin';
				  break;
				  case 'tag':
				  wikiSearch =  'Tagcoin';
				  break;
				  case 'vtc':
				  wikiSearch =  'Vertcoin';
				  break;
				  case 'wdc':
				  wikiSearch =  'Worldcoin';
				  break;
				  case 'xcp':
				  wikiSearch =  'CounterParty';
				  break;
				  case 'xpm':
				  wikiSearch =  'Primecoin';
				  break;
				  case 'yac':
				  wikiSearch =  'YAcoin';
				  break;
				  case 'zcc':
				  wikiSearch =  'ZcCoin';
				  break;
				  case 'zet':
				  wikiSearch =  'Zetacoin';
				  break;
				 default:
				  wikiSearch =  'cryptocurrency';
				}
			$scope.wikiSearch = wikiSearch;
		    //console.log('setwiki:', wikiSearch);
			
		
    })	
  }]);

  function HeaderController($scope, $location){ 
    	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}