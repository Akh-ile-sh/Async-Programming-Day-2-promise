//display areas for country and weather details has been stored
//each variable contains an array of classes(3)
const header = document.querySelectorAll(".header");
const capital = document.querySelectorAll(".capital");
const region = document.querySelectorAll(".region");
const code = document.querySelectorAll(".code");
const img = document.querySelectorAll(".img");
const btn = document.querySelectorAll(".btn");
const temp = document.querySelectorAll(".temp");
const cloud = document.querySelectorAll(".cloud");
const humidity = document.querySelectorAll(".humidity");

//API containing country details
const countryUrl = "https://restcountries.com/v2/all";

const countryData = () => {
  fetch(countryUrl)
    .then((res) => res.json())
    .then((data) => {
      var cityName = []; //empty array which will store name of the capital later

      for (let i = 0; i < 3; i++) {
        //update the display elements
        header[i].innerText = data[i].name;
        capital[i].innerText = `Capital: ${data[i].capital}`;
        region[i].innerText = `Region: ${data[i].region}`;
        code[i].innerText = `Code: ${data[i].alpha3Code}`;
        img[i].setAttribute("src", data[i].flags.png);
        cityName[i] = data[i].capital;

        //API contains weather data
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName[i]}&appid=41575f34d7cb96cd9f250e887e1f7ef3`;
        fetch(weatherUrl)
          .then((res1) => res1.json())
          .then((data1) => {
            // console.log(data1);

            //create an event which will display the weather details while clicking on the button(click for weather)
            btn[i].addEventListener("click", () => {
              temp[i].innerText = `Temp: ${data1.main.temp}K`;
              cloud[i].innerText = data1.weather[0].description;
              humidity[i].innerText = `Humidity: ${data1.main.humidity}`;
            });
          });
      }
    });
};

countryData();
