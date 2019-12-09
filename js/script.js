$(document).ready(function() {

    $("#search-button").on("click", function() {
        var savedButton = $("<button>");
        savedButton.text($("#search-bar").val());
        savedButton.addClass("btn btn-outline-secondary");
        savedButton.css("margin-bottom","5px");
        $(".card-body").append(savedButton);
        $(".card-body").append($("<br>"));
        
    })

});