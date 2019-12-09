$(document).ready(function () {

    var apikey = "c87501e8b4c8cfd8b54fbd772545c8d3";
    var searchedCity;

    function getDateFunction() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }


    $("#search-button").on("click", function () {
        var savedButton = $("<button>");
        savedButton.text($("#search-bar").val());
        savedButton.addClass("btn btn-outline-secondary");
        savedButton.css("margin-bottom", "5px");
        $(".search-term-box").append(savedButton);
        $(".search-term-box").append($("<br>"));
        searchedCity = $("#search-bar").val();
        console.log(searchedCity);
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apikey;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the retrieved data inside of an object called "response"
            .then(function (response) {

                // Log the queryURL
                console.log(queryURL);

                // Log the resulting object
                console.log(response);

                // Transfer content to HTML

                $(".city-name").html("<h2>" + response.name + " (" + getDateFunction() + ")</h2><hr>");

                $(".city-temp").text("Temperature (F) " + response.main.temp);
                $(".city-humidity").text("Humidity: " + response.main.humidity);
                $(".city-wind").text("Wind Speed: " + response.wind.speed);


            });

    });



});