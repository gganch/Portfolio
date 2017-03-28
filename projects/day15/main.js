/* eslint no-undef: 0 */
var API_KEY = 'e27c128d04f78774bef4204f55af5516';
var weatherBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';

$(function () {
  $.getJSON('http://ipinfo.io', function (data) {
    // Retrieve data
    var zipCode = data.postal;
    var countryCode = data.country.toLowerCase();
    var city = data.city;

    // Generate weather url
    var url = weatherBaseUrl + zipCode + ',' + countryCode + '&appid=' + API_KEY;
    // Request weather url
    $.getJSON(url, function (data) {
      console.log(data);
      var currentWeather = data.weather[0].description;
      var currentTemp = data.main.temp;
      // updating the HTML with the data from the API
      $('#temperature').html(Math.round(currentTemp));
      $('#farenheight').css('color', 'white');
      $('#celsius').css('color', '#b0bec5');
      // Adjusting the color of fahrenheit based on click
      $('#farenheight').click(function () {
        $(this).css('color', 'white');
        $('#celsius').css('color', '#b0bec5');
        $('#temperature').html(Math.round(currentTemp));
      });
      // Toggling between fahrenheit and celsius
      $('#celsius').click(function () {
        $(this).css('color', 'white');
        $('#farenheight').css('color', '#b0bec5');
        $('#temperature').html(Math.round(currentTemp - 32)) * 1.8;
      });

      $('#city').html(city + ', ' + countryCode.toUpperCase());

      console.log(data.weather[0].main);
// Showing the right weather icon depending on the condition of the current weather
      switch (data.weather[0].main) {
        case 'Drizzle':
          $('div.sun-shower').removeClass('hide');
          break;
        case 'Clouds':
          $('div.clouds').removeClass('hide');
          break;
        case 'Rain':
          $('div.rainy').removeClass('hide');
          break;
        case 'Snow':
          $('div.flurries').removeClass('hide');
          break;
        case 'Clear':
          $('div.sunny').removeClass('hide');
          break;
        case 'Thunderstorm':
          $('div.thunder-storm').removeClass('hide');
          break;
        default:
          $('div.clouds').removeClass('hide');
      }
      $('.windspeed').html(data.wind.speed + ' m/h');
      $('.humidity').html(data.main.humidity + ' %');
      $('#status').html(currentWeather);
// calculating the sunrise and sunset time
      var sunriseUTC = data.sys.sunrise * 1000;
      var sunsetUTC = data.sys.sunset * 1000;
      var sunriseDt = new Date(sunriseUTC);
      var sunsetDt = new Date(sunsetUTC);
      $('.sunrisetime').html((sunriseDt.getHours()>12?(sunriseDt.getHours()-12):sunriseDt.getHours()).toString() + ":" + ((sunriseDt.getMinutes() < 10 ? '0' : '').toString() + sunriseDt.getMinutes().toString()) + (sunriseDt.getHours() < 12 ? ' AM' : ' PM').toString());
      $('.sunsettime').html((sunsetDt.getHours()>12?(sunsetDt.getHours()-12):sunsetDt.getHours()).toString() + ":" + ((sunsetDt.getMinutes() < 10 ? '0' : '').toString() + sunsetDt.getMinutes().toString()) + (sunsetDt.getHours() < 12 ? ' AM' : ' PM').toString());
    });
  });
});
