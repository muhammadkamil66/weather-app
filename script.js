const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const icons = {
    "01":"wi-day-sunny",
    "02":"wi-day-cloudy",
    "03":"wi-cloud",
    "04":"wi-cloudy",
    "09":"wi-showers",
    "10":"wi-day-rain",
    "11":"wi-thunderstorm",
    "13":"wi-snow",
    "50":"wi-fog",
}
function getWeatherIcon(weatherType) {
    return icons[weatherType.substring(0, weatherType.length - 1)]
}
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
            document.querySelector(".cloud").innerHTML = `<i class="wi ${getWeatherIcon(weatherType)}"></i>`;
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
                document.querySelector(`.day> p`).innerHTML = days[d.getDay()];
                document.querySelector(`.date`).innerHTML = `${months[d.getMonth()]} ${d.getDate()}`;
                document.querySelector(`.day #temp > span`).innerHTML = Math.round(data.list[index].main.temp);
                document.querySelector(`.day #cloud`).innerHTML = (data.list[index].weather[0].description);
                document.querySelector(`.cloudy`).innerHTML = `<i class="wi ${getWeatherIcon(data.list[index].weather[0].icon)}"></i>`;
                
                const dayElement=document.querySelector('.day').cloneNode(true);
                const displaySection = document.querySelector('.display-sec');
                dayElement.style.display='block';
                displaySection.appendChild(dayElement);
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
