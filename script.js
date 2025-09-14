const apiKey = "b8af98a0e2cf08aba83bc630151cd5eb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Corrected URL

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // Add error handling to check if the city was found
    if (response.status === 404) {
        document.querySelector(".city").innerHTML = "City not found 😥";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".wind").innerHTML = "--km/h";
        document.querySelector(".humidity").innerHTML = "--%";
        return; // Exit the function
    }
    
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;    
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";    
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";    
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";    

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src ="/image/images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src ="/image/images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src ="/image/images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src ="/image/images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src ="/image/images/mist.png";
    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Optional: Call the function with an initial city to display weather on page load
// checkWeather("imphal");