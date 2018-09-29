let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function getWeatherIcon(weatherType) {
//     let icon;
//     // TODO: try using switch statement here instead of if/else
//     if (weatherType == "01d" || weatherType == "01n") {
//         icon = "wi-day-sunny";
//     }
//     else if (weatherType == "02d" || weatherType == "02n") {
//         icon = "wi-day-cloudy";
//     }
//     else if (weatherType == "03d" || weatherType == "03n") {
//         icon = "wi-cloud";
//     }
//     else if (weatherType == "04d" || weatherType == "04n") {
//         icon = "wi-cloudy";
//     }
//     else if (weatherType == "09d" || weatherType == "09n") {
//         icon = "wi-showers";
//     }
//     else if (weatherType == "10d" || weatherType == "10n") {
//         icon = "wi-day-rain";
//     }
//     else if (weatherType == "11d" || weatherType == "11n") {
//         icon = "wi-thunderstorm";
//     }
//     else if (weatherType == "13d" || weatherType == "13n") {
//         icon = "wi-snow";
//     }
//     else if (weatherType == "50d" || weatherType == "50n") {
//         icon = "wi-fog";
//     }
//     return icon;
// }

function getWeather() {


    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".weather-comment").style.display = "none";
    document.querySelector(".error").style.display = "none";


    const cityName = document.querySelector("input").value;

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19327fb20ae55f03a05cf4c2751e0ce2&units=metric`,
        success: function (data) {
            console.log(data);

            weatherType = data.weather[0].icon;
            document.querySelector(".cloud").innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/>`;
            document.querySelector(".city-name").innerHTML = `${data.name} , ${data.sys.country}`;
            document.querySelector(".temp > span").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".description").innerHTML = data.weather[0].main;
            document.querySelector(".min").innerHTML = Math.round(data.main.temp_min) + "°C /";
            document.querySelector(".max").innerHTML = Math.round(data.main.temp_max) + "°C";

        },
        error: function (err) {
            console.log(err);
        }
    })

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=19327fb20ae55f03a05cf4c2751e0ce2&units=metric`,
        success: function (data) {
            document.querySelector(".main").style.display = "block";
            for (let i = 1; i <= 5; i++) {
                const index = 8 * (i - 1);
                let d = new Date(data.list[index].dt * 1000);
                document.querySelector(`.day${i} > p`).innerHTML = days[d.getDay()];
                document.querySelector(`.date${i}`).innerHTML = `${months[d.getMonth()]} ${d.getDate()}`;
                document.querySelector(`.day${i} #temp > span`).innerHTML = Math.round(data.list[index].main.temp);
                document.querySelector(`.day${i} #cloud`).innerHTML = (data.list[index].weather[0].description);
                // document.querySelector(`.cloud-${i}`).innerHTML = `<i class="wi ${getWeatherIcon(data.list[index].weather[0].icon)}"></i>`;
                document.querySelector(`.cloud-${i}`).innerHTML = `<img src="http://openweathermap.org/img/w/${data.list[index].weather[0].icon}.png"/>`;
            }

        },

        error: function (error) {
            console.log(error);
            document.querySelector(".error").innerHTML = (error.responseJSON.message);
            document.querySelector(".weather-info").style.display = "none";
            document.querySelector(".main").style.display = "none";
            document.querySelector(".error").style.display = "block";




        }

    })

}

function mySubmitFunction() {
    return false;
}
