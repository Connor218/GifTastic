$(document).ready(function(){

    var gif = ["The Office", "Crying", "Cats", "Dog", "New Girl"]
    renderButtons()
    function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $(".gifs-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < gif.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("gifButton");
          // Added a data-attribute
          a.attr("data-name", gif[i]);
          // Provided the initial button text
          a.text(gif[i]);
          // Added the button to the HTML
          $(".gifs-view").append(a);
        }
      }


      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var giffi = $("#gif-input").val();
        $("#gif-input").val("");
        // The movie from the textbox is then added to our array
        gif.push(giffi);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

      $(document).on("click", ".gifButton", function() {
        var image = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          image + "&api_key=dc6zaTOxFJmzC&limit=10";
   
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
   
              var rating = results[i].rating;
   
              var p = $("<p>").text("Rating: " + rating);
   
              var gifImage = $("<img>");
              gifImage.attr("src", results[i].images.fixed_height_still.url);
              gifImage.attr("data-state", "still");
              gifImage.attr("data-still", results[i].images.fixed_height_still.url);
              gifImage.attr("data-animate", results[i].images.fixed_height.url);
   
              gifDiv.prepend(p);
              gifDiv.prepend(gifImage);
   
              $("#giffy").prepend(gifDiv);
            }
          });
    });

      $("#giffy").on("click","img", function() {

        var state = $(this).attr("data-state");
       
        if(state === 'still') {
            
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
         } else if(state === 'animate') {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
          
        }
       
    });

});