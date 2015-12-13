$(document).ready(function(){
	var forecast;
	getLocation();
	// get location and pass to show function
	function getLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(getForecast);
		}
		else{
			$(".message").innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	// using openweather api
	// get the forecast and show it
	function getForecast(location){
		$.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+location.coords.latitude+"&lon="+location.coords.longitude+"&cnt=5&mode=json&units=imperial&APPID=454420fd33898ae52c01398a3bc759c3", function(output){
				// set applicable css
				for(var i = 0; i < output.list.length; i++){
					var d = new Date(output.list[i].dt * 1000);
					var day = d.getDay();
					var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
					$("."+i).append(
						"<div class='day-text'>"+
						"<p>"+ weekDays[day] +"</p>"+
						"<p>"+Math.round(output.list[i].temp.day)+"&deg;F</p>"+
						"</div>"+
						"<img class='icon' src='img/icons/"+output.list[i].weather[0].icon+".svg'>"
					);
				}
				// displaying location
				$(".location").text(output.city.name);
				console.log("Weather ID", output.list[0].weather[0].icon);
			}
		);
	};
});