let pop = document.getElementById("pop");

console.log("Value of Pop is " + pop);

function openPopup() {
    pop.classList.add("open");
}

function closePopup() {
    pop.classList.remove("open");
}

function playSound() {
	var sound = new Audio('audio.mp3');
	sound.play();
}

let weather = {
    apiKey: "f29f053a9468a4c5bcc92fa0a021348c",

    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch(function (error) {
                console.log("error is there");
                openPopup();
				playSound();
            });
    },

    displayWeather: function (data) {
        const { name } = data;

        if (data.weather[0] == undefined) {
            console.log("Invalid City.");
        }

        const { icon, description } = data.weather[0];

        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp.toFixed(1) + "°C";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + (speed * 3.6).toFixed(1) + " km/h";

        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/4800×2400/?" + name + "')";
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
        closePopup();
    }
});
