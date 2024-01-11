# Weather_Dashboard

## Description

I have created this small website called "Weather Dashboard". It displays weather forecast of present day and following 5 days for the searched city.

## Installation

<a href ="https://vinitp2.github.io/Weather_Dashboard/" target="_blank"> Click Me to access the website ! </a>

## Usage

This website only has a homepage. 

<p>
At the page load, the website prompts the user if they want to share their location. If the user agrees,  it uses their current coordinates to fetch the weather data using weatherAPI.
</p>

<p>
The user can then manually search for a specific city by typing in the search bar and searching for it. Once the user searched for a city, it feeds that city name to weatherAPI and at the same time it stores the city name to user's local storage so that it can be displayed underneath a search bar as a searched city.
</p>

<p>
The users can also select from the city names listed below the search bar as searched city history. 
</p>

<h3>The following is the list of APIs that were used in this website :</h3>

<ul>
<li><a href ="https://day.js.org/en/"> Day.js</li>
<li><a href ="https://openweathermap.org/api"> OpenWeatherAPI</li>

</ul>

<h3>The following is a quick demo of the software</h3>

<img src = "./Assets/Weather_Dashboard_demo.gif"/>

## License
N/A