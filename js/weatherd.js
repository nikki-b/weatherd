$(document).ready(function(){
	var forecast;
	getLocation();
	// get location and pass to show function
	function getLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(getForecast);
		}
		else{
			$("#message").innerHTML = "Geolocation is not supported by this browser.";
		}
	}

	// using openweather api
	// get the forecast and show it
	function getForecast(location){
		$.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+location.coords.latitude+"&lon="+location.coords.longitude+"&cnt=5&mode=json&units=imperial&APPID=454420fd33898ae52c01398a3bc759c3", function(output){
			console.log(output);
			// get the local time
			getTime(location.coords.latitude,location.coords.longitude, Date());
			// set applicable css
			for(var i = 0; i < output.list.length; i++){
				var d = new Date(output.list[i].dt * 1000);
				var day = d.getDay();
				var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				$("#"+i).append(
					"<h4>"+ weekDays[day] +"</h4>"+
					"<h3>"+Math.round(output.list[i].temp.day)+"&deg;F</h3>"+
					"<img src='img/"+output.list[i].weather[0].icon+".svg'>"
				);
			}
			// displaying location
			$("#location").text(output.city.name);
			console.log("Weather ID", output.list[0].weather[0].icon);
		})
	}
	// function getTime(lat,lon,timestamp){
	// 	$.get("https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lon+"&timestamp="+timestamp+"&key=AIzaSyDlhfCFWMgdqCSsVbp7_Kax76cLGrYURUU", function(output){
	// 		console.log(output);
	// 		}
	// 	);
	// };

})