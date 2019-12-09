$(document).ready(function() {

    var apikey = "c87501e8b4c8cfd8b54fbd772545c8d3";
    var searchedCity;
    

    $("#search-button").on("click", function() {
        var savedButton = $("<button>");
        savedButton.text($("#search-bar").val());
        savedButton.addClass("btn btn-outline-secondary");
        savedButton.css("margin-bottom","5px");
        $(".card-body").append(savedButton);
        $(".card-body").append($("<br>"));
        searchedCity = $("#search-bar").val();
        console.log(searchedCity);
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apikey;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
      
              // Log the queryURL
              console.log(queryURL);
      
              // Log the resulting object
              console.log(response);
      
              // Transfer content to HTML
              $(".city").html("<h1>" + response.name + " Weather Details</h1>");
              $(".wind").text("Wind Speed: " + response.wind.speed);
              $(".humidity").text("Humidity: " + response.main.humidity);
              $(".temp").text("Temperature (F) " + response.main.temp);
      
              // Converts the temp to Kelvin with the below formula
              var tempF = (response.main.temp - 273.15) * 1.80 + 32;
              $(".tempF").text("Temperature (Kelvin) " + tempF);
      
              // Log the data in the console as well
              console.log("Wind Speed: " + response.wind.speed);
              console.log("Humidity: " + response.main.humidity);
              console.log("Temperature (F): " + response.main.temp);
            });
        
    });



});