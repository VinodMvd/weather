var app = angular.module('weatherApp',[]);
app.controller('weatherCtrl', function($scope, $http){
		var vm = $scope;
		
		/*$http.get("http://ip-api.com/json").success(function(data){
			vm.lat = data.lat;
			vm.lon = data.lon;
			var apiKey = "f1f9d146fbf71bcd80eeabab821f34cb";
			console.log(vm.lat);
		});*/
		var count = 0;
    	navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			getthevalue(lat,lng);
			count = 1;
		},
		function (error) { 
  			if (error.code == error.PERMISSION_DENIED)
      		alert("Weather might not be accurate as location is blocked");
	  		getthevalue();
		});
		function getthevalue(a,b){
		$http({
			method:"get",
			url: "https://api.ipify.org/?format=json"
		}).then(function(data){
			vm.ip = data.data.ip;
			var ipurl = "https://ipapi.co/"+vm.ip+"/json/";
			
		$http({
			method: "get",
			url: ipurl
		}).then(function(data){
				vm.lat = data.data.latitude;
				vm.lon = data.data.longitude;
				var apiKey = "17ca9be1b3c6b2f28c31fa0c7c6dafcd";	
				if(count == 1){
					var openWeatherUrl = "https://api.openweathermap.org/data/2.5/find?lat="+a+"&lon="+b+"&appid="+apiKey;
				}
				else{
					var openWeatherUrl = "https://api.openweathermap.org/data/2.5/find?lat="+vm.lat+"&lon="+vm.lon+"&appid="+apiKey;
				}
			
			$http({
				method:"get",
				url: openWeatherUrl
			}).then(function(data){
				console.log(openWeatherUrl);
				vm.description = data.data.list[0].weather[0].description;
				vm.speed = (2.237*data.data.list[0].wind.speed).toFixed(1)+"Mph";
				vm.location = data.data.list[0].name;
				vm.temp=data.data.list[0].main.temp;
				vm.fTemp = (vm.temp*(9/5)-459.67).toFixed(1)+"°F";
				vm.cTemp = (vm.temp-273).toFixed(1)+"°C";
				vm.humidity = data.data.list[0].main.humidity;
				vm.icon = "https://openweathermap.org/img/w/"+data.data.list[0].weather[0].icon+".png";
				
				switch(vm.description){
					case ('scattered clouds'):{
						vm.weatherBackground = {
							"background": "url('Images/Scattered clouds.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('haze'):{
						vm.weatherBackground = {
							"background": "url('Images/Haze.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('light intensity drizzle'):{
						vm.weatherBackground = {
							"background": "url('Images/Rain.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('thunderstrom with rain'):{
						vm.weatherBackground = {
							"background": "url('Images/Thunderstrom With Rain.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('mist'):{
						vm.weatherBackground = {
							"background": "url('Images/Mist.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('overcast clouds'):{
						vm.weatherBackground = {
							"background": "url('Images/Overcast Clouds.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('broken clouds'):{
						vm.weatherBackground = {
							"background": "url('Images/Broken Clouds.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('few clouds'):{
						vm.weatherBackground = {
							"background": "url('Images/Few Clouds.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('sky is clear'):{
						vm.weatherBackground = {
							"background": "url('Images/Clear Sky.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('shower rain'):{
						vm.weatherBackground = {
							"background": "url('Images/Shower Rain.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('rain'):{
						vm.weatherBackground = {
							"background": "url('Images/Rain.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('light rain'):{
						vm.weatherBackground = {
							"background": "url('Images/Rain.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					case ('thunderstrom'):{
						vm.weatherBackground = {
							"background": "url('Images/Thunderstrom.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					break;
					}
					default:{
						vm.weatherBackground = {
							"background": "url('Images/Default.jpg')",
							"background-size": "cover",
							"background-repeat": "no-repeat"
						}
					}
				
				}
			},function(error){
				console.log(error);
			});
				
				
			}, function(error){
				console.log(error);
			});
		});
		$scope.checktype = true;
		$scope.trail = function(){
			
			if($scope.checktype == true){
				$scope.checktype=false;
			}
			else{
				$scope.checktype=true;
			}
		}
			}
});
$(function() {
    $('#toggle-one').bootstrapToggle();
})
document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'interactive') {
       document.getElementById('content').style.visibility="hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
         document.getElementById('interactive');
         document.getElementById('load').style.visibility="hidden";
         document.getElementById('content').style.visibility="visible";
      },1000);
  }
}





