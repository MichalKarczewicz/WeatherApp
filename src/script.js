let weather = {
	apiKey: "e1d16cc173dab49b5949deac6c2b0238",
	fetchWeather: function (city) {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=" +
				city +
				"&units=metric&appid=" +
				this.apiKey
		)
			.then(response => response.json())
			.then(data => displayWeather(data));
	},
};

const search = () => {
	weather.fetchWeather(document.querySelector(".search-bar").value);
};

const displayWeather = data => {
	const { name } = data;
	const { icon, description } = data.weather[0];
	const { temp, humidity } = data.main;
	const { speed } = data.wind;
	console.log(name, icon, description, temp, humidity, speed);
	document.querySelector(".city").innerText = "Weather in " + name;
	document.querySelector(".icon").src =
		"https://openweathermap.org/img/wn/" + icon + ".png";
	document.querySelector(".description").innerText = description;
	document.querySelector(".temp").innerText = Math.round(temp) + "°C";
	document.querySelector(".humidity").innerText =
		"Humidity: " + humidity + " %";
	document.querySelector(".wind").innerText =
		"Wind speed: " + Math.round(speed) + " km/h";
	document.querySelector(".weather").classList.remove("loading");
};

const nextDays = () => {
	document.querySelector(".popup").classList.remove("show-popup");
};

document.querySelector(".search-button").addEventListener("click", () => {
	search();
});

document.querySelector(".remove-button").addEventListener("click", () => {
	document.querySelector(".popup").classList.add("show-popup");
});

document.querySelector(".search-bar").addEventListener("keyup", e => {
	if (e.key == "Enter") {
		search();
	}
});

document.querySelector(".next-days").addEventListener("click", () => {
	nextDays();
});

weather.fetchWeather("Szczecin");
