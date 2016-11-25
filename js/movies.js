$(document).ready(function() {
//	var bookHTML;
//	var movieHTML;

	// User enters a search term
	// When user hits enter key...
	$('#search').keypress(function(e) {
		if (e.which == 13) { // enter
			e.preventDefault();

			// Movie search url
			var movieAPI = 'https://www.omdbapi.com/?';
			// Get search term
			var movieSearch = 's=' + $('input#search');

			// Callback function to get records for first 100 results and display posters
			function displayMovies(response) {
				console.log(response);
				var movies = response.Search;
				movieHTML = '<ul>'; // start gallery list

				if (response.Response == false) {
						movieHTML += '<p id="no-results">No results found.</p>';
					}

				else {
				// Loop through search results

					for (i=0; i<movies.length; i++) {
							movieHTML += '<li>';
							movieHTML +='<img src="';
							movieHTML += movies[i].Poster + '" ';
							movieHTML += 'alt="' + movies[i].Title + '"/></a>';
							movieHTML += '<p class="movie-title">' + movies[i].Title + '</p>';
							movieHTML +='</li>';
						} // end for loop
				} // end else statement

				movieHTML += '</ul>'; // end gallery list
				console.log(movieHTML); // test

				$('#gallery').html(bookHTML + movieHTML);
			}; // end displayMovies

			// AJAX request to OMDB
			$.getJSON(movieAPI, movieSearch, displayMovies);

		} // end if statement

	}); //end submit function

}); //end ready
