$(document).ready(function () {

    var apikey = "c87501e8b4c8cfd8b54fbd772545c8d3";
    var searchedCity;

    function getDateFunction(daysPast) {
        var today = new Date();
        var dd = String(today.getDate() + daysPast).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }


    $("#search-button").on("click", function () {

        var cityId;
        var savedButton = $("<button>");
        savedButton.text($("#search-bar").val());
        savedButton.addClass("btn btn-outline-secondary");
        savedButton.css("margin-bottom", "5px");
        $(".search-term-box").append(savedButton);
        $(".search-term-box").append($("<br>"));
        searchedCity = $("#search-bar").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apikey;
        var iconCode;
        var iconCodeForecast;
        var iconCodeForecastUrl;
        var iconUrl;


        $.ajax({
            url: queryURL,
            method: "GET",

        })
            // We store all of the retrieved data inside of an object called "response"
            .then(function (response) {
                iconCode = response.weather[0].icon;
                cityId = response.id;
                iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                // Transfer content to HTML

                $(".city-name").html("<h2>" + response.name + " (" + getDateFunction(0) + ")</h2>");
                $(".city-name").append($("<img>").attr("src", iconUrl));
                $(".city-temp").text("Temperature (F) " + response.main.temp);
                $(".city-humidity").text("Humidity: " + response.main.humidity);
                $(".city-wind").text("Wind Speed: " + response.wind.speed);
                getForecast(cityId); //run next AJAX call to get the 5day forecast
            });



        function getForecast(cityId) {
            forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + apikey;
            console.log("Hey: " + forecastQueryURL)
            $.ajax({
                url: forecastQueryURL,
                method: "GET"
            }).then(function (response) {


                for (var i = 0; i < 5; i++) {

                    iconCodeForecast = response.list[i].weather[0].icon;

                    iconCodeForecastUrl = "http://openweathermap.org/img/w/" + iconCodeForecast + ".png";
                    var forecastDayCard = $(".forecast-day[data-id='" + (i + 1) + "']");
                    forecastDayCard.append($("<h5>").text(getDateFunction(i + 1)));
                    forecastDayCard.css("margin", "10px");
                    forecastDayCard.css("background-color", "rgb(5, 149, 206)");
                    forecastDayCard.append($("<img>").attr("src", iconCodeForecastUrl));
                    forecastDayCard.append($("<p>").text("Temp: " + response.list[i].main.temp + "F"));
                    forecastDayCard.append($("<p>").text("Humidity: " + response.list[i].main.humidity + "%"));
                };


            });
        };


    });



});