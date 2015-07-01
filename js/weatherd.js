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
	// get the forecast and show it
	function getForecast(location){
		$.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+location.coords.latitude+"&lon="+location.coords.longitude+"&cnt=5&mode=json&units=imperial", function(output){
			console.log(output);
			$("#today").append(
				"<p>"+Math.round(output.list[0].temp.day)+"&deg;</p>"+
				"<p>"+output.list[0].weather[0].description+
				"</p><img src='img/"+output.list[0].weather[0].icon+".svg'>"
			);
			$("#1").append(
				"<p>"+Math.round(output.list[1].temp.day)+"&deg;</p>"+
				"<p>"+output.list[1].weather[0].description+"</p>"+
				"<img src='img/"+output.list[1].weather[0].icon+".svg'>"
			);
			$("#2").append(
				"<p>"+Math.round(output.list[2].temp.day)+"</p>&deg;"+
				"<p>"+output.list[2].weather[0].description+"</p>"+
				"<img src='img/"+output.list[2].weather[0].icon+".svg'>"
			);
			$("#3").append(
				"<p>"+Math.round(output.list[3].temp.day)+"</p>&deg;"+
				"<p>"+output.list[3].weather[0].description+"</p>"+
				"<img src='img/"+output.list[3].weather[0].icon+".svg'>"
			);
			$("#4").append(
				"<p>"+Math.round(output.list[4].temp.day)+"</p>&deg;"+
				"<p>"+output.list[4].weather[0].description+"</p>"+
				"<img src='img/"+output.list[4].weather[0].icon+".svg'>"
			);
			$("#location").text(output.city.name);
			console.log("Weather ID", output.list[0].weather[0].icon);
		})
	}
})