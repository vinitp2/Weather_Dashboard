var cityInput = document.querySelector(`.cityName`);
var cityList = document.querySelector(`.cityList`);
var searchBtn = document.querySelector(`.searchBtn`);
var icon = document.querySelector(`#icon`);
var lat, lon;
var Temp, Wind, Humidity;
var weatherIcon, weatherIconURL;
var cityName;
var cityArr = [];
var TempArr = [];
var windArr = [];
var HumidArr = [];
var iconArr = [];
var dateArr = [];
var totalDays = 5;

//grabbing elements from the weather forecast cards.

for (let i = 0; i < totalDays; i++) {
    dateArr.push(document.querySelector(`.date_${i}`));
    TempArr.push(document.querySelector(`.temp_${i}`));
    windArr.push(document.querySelector(`.wind_${i}`));
    HumidArr.push(document.querySelector(`.humid_${i}`));
    iconArr.push(document.querySelector(`.icon_${i}`));
    dateArr[i].textContent = dayjs().add(i + 1, `day`).format(`MM/DD/YYYY`);
    TempArr[i].textContent = `Temp : ${i} C`;
    windArr[i].textContent = `Wind : ${i} Kmph`;
    HumidArr[i].textContent = `Humidity : ${i} %`;
    iconArr[i].textContent = `${i}`;
}

// to push the searched city on the localstorage and also feed the city name to api
searchBtn.addEventListener("click", function(e) {
    e.preventDefault();

    if (window.localStorage.length > 0) { //avoids making cityArr null if the local storage is empty.
        cityArr = JSON.parse(localStorage.getItem("cityArr"));
    }

    cityArr.push(cityInput.value);
    localStorage.setItem("cityArr", JSON.stringify(cityArr));
    cityName = cityInput.value;
    getAPI();
});

// to capture user's current info using geolocation API;
const successCallback = (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let requestURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=5d4332dab2640be43629e122b795f9f2`;
    fetch(requestURL).then(response => response.json()).then(data => {
        cityName = data[0].name; //fetching the user's city name based on their current coordinates.
        getAPI();
    })
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

//function to fetch weather data from the API from the city name provided.
function getAPI() {
    let currDate = dayjs().format(`MM/DD/YYYY`);
    var cityH1 = document.querySelector(`#cityH1`);
    cityH1.textContent = `${cityName} (${currDate})`;

    let requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=5d4332dab2640be43629e122b795f9f2`;
    fetch(requestURL).then(response => response.json()).then(data => {

        // fetching Longtitude and Latitude from the city name user searched for and to grab it's weather data. 
        lon = parseFloat(data[0].lon);
        lat = parseFloat(data[0].lat);

        let requestURL1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5d4332dab2640be43629e122b795f9f2`
        fetch(requestURL1).then(response1 => response1.json()).then(data1 => {
            Temp = data1.main.temp;
            Humidity = data1.main.humidity;
            Wind = (data1.wind.speed * 3.5); // the result is in m/s converting it to km/h
            Wind = Wind.toFixed(2); //displaying only 2 decimal points
            weatherIcon = data1.weather[0].icon;
            weatherIconURL = `https://openweathermap.org/img/w/${weatherIcon}.png`
            icon.src = weatherIconURL;
            displayWeatherData();

            // getting forecast of next 5 days
            let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=5d4332dab2640be43629e122b795f9f2&cnt=6`;
            fetch(forecastURL).then(response2 => response2.json()).then(data2 => {
                for (let j = 0; j < totalDays; j++) {
                    TempArr[j].textContent = `Temp :${data2.list[j+1].main.temp} °C`
                    windArr[j].textContent = `Wind :${(data2.list[j+1].wind.speed * 3.5).toFixed(2)} KM/H`;
                    HumidArr[j].textContent = `Humidity : ${data2.list[j+1].main.humidity} %`;
                    iconArr[j].src = `https://openweathermap.org/img/w/${data2.list[j+1].weather[0].icon}.png`
                }
            });

        });
    });
}

function displayWeatherData() {
    let tempData = document.querySelector(`#temp`);
    tempData.textContent = `Temp : ${Temp} °C`
    let windData = document.querySelector(`#wind`);
    windData.textContent = `Wind : ${Wind} KMPH`;
    let humidityData = document.querySelector(`#humidity`);
    humidityData.textContent = `Humidity : ${Humidity} %`;
}
displayCityList()

function displayCityList() {

    if (window.localStorage.length > 0) { //avoids making cityArr null if the local storage is empty.
        cityArr = JSON.parse(localStorage.getItem("cityArr"));
    }

    let cityListBtns = document.createElement(`div`);
    cityListBtns.setAttribute('class', 'cityListBtns');
    for (let j = 0; j < cityArr.length; j++) {
        let tempBtn = document.createElement('button');
        tempBtn.textContent = cityArr[j];
        tempBtn.setAttribute("class", "w-100");
        cityListBtns.append(tempBtn);
    }
    cityList.append(cityListBtns);
}

//to search weather data of the searched city.
document.querySelector(`.cityListBtns`).addEventListener("click", function(event) {
    event.preventDefault();
    cityName = event.target.textContent;
    getAPI();
})