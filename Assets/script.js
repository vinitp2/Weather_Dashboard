var cityInput = document.querySelector(`.cityName`);
var searchBtn = document.querySelector(`.searchBtn`);
var icon = document.querySelector(`#icon`);
var lat, lon;
var Temp, Wind, Humidity;
var weatherIcon, weatherIconURL;
var cityName;

//function to capture coordinates of the city entered by the user

// getAPI();
searchBtn.addEventListener("click", function(e){
    console.log(cityInput.value);
    cityName = cityInput.value;
    getAPI();
});


// to capture user's current info using geolocation API;
const successCallback = (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(`lat: ${lat} lon: ${lon}`);
    let requestURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=5d4332dab2640be43629e122b795f9f2`;
    fetch(requestURL).then(response=>response.json()).then(data=>{
        cityName = data[0].name;
        console.log(cityName);
        getAPI();
    })
};

const errorCallback = (error) => {
    console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


function getAPI(){
    
    
    let currDate = dayjs().format(`MM/DD/YYYY`);
    var cityH1 = document.querySelector(`#cityH1`);
    cityH1.textContent = `${cityName} (${currDate})`;
    let requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5d4332dab2640be43629e122b795f9f2`;
    fetch(requestURL).then(response=>response.json()).then(data=>{
        lon = parseFloat(data[0].lon);
        lat = parseFloat(data[0].lat);

        let requestURL1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5d4332dab2640be43629e122b795f9f2`
        
        fetch(requestURL1).then(response1=>response1.json()).then(data1=>{
            Temp = data1.main.temp;
            Humidity = data1.main.humidity;
            Wind = (data1.wind.speed * 3.5); // the result is in m/s converting it to km/h
            Wind = Wind.toFixed(2); //displaying only 2 decimal points
            weatherIcon = data1.weather[0].icon;
            weatherIconURL = `https://openweathermap.org/img/w/${weatherIcon}.png`
            icon.src = weatherIconURL;
            console.log(`Temp : ${Temp} Humidity : ${Humidity} Wind : ${Wind}`);
            displayWeatherData();
            displayFiveDayData();
        });
    });
}

function displayWeatherData(){
    // getAPI();
    // console.log("Outside API");
    // var cityInfo = document.querySelector(`#cityInfo`);
    let tempData = document.querySelector(`#temp`);
    tempData.textContent = `Temp : ${Temp} °C`
    // cityInfo.append(tempData);
    let windData = document.querySelector(`#wind`);
    windData.textContent = `Wind : ${Wind} KMPH`;
    // cityInfo.append(windData);
    let humidityData = document.querySelector(`#humidity`);
    humidityData.textContent = `Humidity : ${Humidity} %`;
    // cityInfo.appendChild(humidityData);
}

function displayFiveDayData(){

}
