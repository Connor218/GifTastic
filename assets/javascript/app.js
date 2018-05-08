$(document).ready(function(){

    var gif = ["The Office", "Crying", "Cats", "Dog", "New Girl"]
    renderButtons()
    function renderButtons() {
        
        $(".gifs-view").empty();
  
        for (var i = 0; i < gif.length; i++) {

          var a = $("<button>");

          a.addClass("gifButton");
    
          a.attr("data-name", gif[i]);
          
          a.text(gif[i]);
       
          $(".gifs-view").append(a);
        }
      }


      $("#add-gif").on("click", function(event) {
        event.preventDefault();
       
        var giffi = $("#gif-input").val();
        $("#gif-input").val("");
       
        gif.push(giffi);
       
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