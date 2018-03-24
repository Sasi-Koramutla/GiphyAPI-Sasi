// Initial array of movies
var movies = ["cat", "dog", "bird", "falcon", "fox", "tiger", "lion"];

// Function for dumping the JSON content for each button into the div
function displayMovieInfo() {

  var movie = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      
      console.log(queryURL);
      console.log(response);
  // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var animalDiv = $("<div>");

      // Creating and storing an image tag
      var animalImage = $("<img class='gif' data-state='still' style='cursor:pointer;'>");
      // Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
     // animalImage.attr("class", "gif");
       if (i === results.length - 1)
       {
           animalDiv.append("<h2><strong>Click on the Gifs! </strong></h2><br>");
       }
      // Appending the paragraph and image tag to the animalDiv
      animalDiv.append(animalImage);

      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(animalDiv);
    }
    renderButtons();
  });
}

// Function for displaying movie data
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamically generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button class='btn btn-primary'>");
    // Adding a class of movie to our button
    a.addClass("movie");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding the movie from the textbox to our array
  movies.push(movie);
  console.log(movies);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Function for displaying the movie info
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();

$(document).on("click", ".gif", function() {
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
console.log("Clicked Gif");
var state = $(this).attr("data-state");
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}
});