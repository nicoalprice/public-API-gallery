$(document).ready(function() {
	// User enters a search term
	// When user hits enter key...
	$('body').keypress(function(e) {
		if (e.which == 13) { // enter
			e.preventDefault();

			// Book search url
			var openLibraryAPI = 'https://openlibrary.org/search.json';
			// Movie search url
			var movieAPI = 'https://www.omdbapi.com/?';
			// Get search terms
			var bookSearch = $('input#search').serialize();
			var movieSearch = 's=' + $('input#search').val();

			// Callback function to display book covers
			function displayBooks(response) {
				var bookHTML = '<ul>'; // start gallery list
				var books = response.docs;

				if (response.numFound == 0) {
						bookHTML += '<p id="no-results">No results found.</p>';
				}
				else {
				// Loop through search results
					for (i=0; i<100; i++) {
						// Only show titles with cover images
						if (books[i].cover_edition_key != undefined) {
							bookHTML += '<li>';
							bookHTML += '<a href="http://openlibrary.org/books/';
							bookHTML += books[i].edition_key[0] + '" target="_blank">';
							bookHTML +='<img src="http://covers.openlibrary.org/b/olid/';
							bookHTML += books[i].cover_edition_key;
							bookHTML += '-M.jpg" alt="' + books[i].title + '"/></a>';
							bookHTML += '<p class="title">' + books[i].title + '</p>';
							bookHTML +='</li>';
						}
					}; // end for loop
					} // end else statement

				bookHTML += '</ul>'; // end gallery list

				$('#gallery').html(bookHTML);
			}; // end displayBooks


			// Callback function to display movie posters
			function displayMovies(response) {
				var movies = response.Search;
				var movieHTML = '<ul>'; // start gallery list

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
						movieHTML += '<p class="title">' + movies[i].Title + '</p>';
						movieHTML +='</li>';
					} // end for loop
				} // end if/else statement

				movieHTML += '</ul>'; // end gallery list

				$('#gallery').html(movieHTML); // display movies
			}; // end displayMovies

		// If book search is checked
		if ($('input#book-search').is(":checked")) {
			// Make a GET request to OpenLibrary, sending the search term along
			$.getJSON(openLibraryAPI, bookSearch, displayBooks);
		}
		// If movie search is checked
		else if ($('input#movie-search').is(":checked")) {
			// AJAX request to OMDB
			$.getJSON(movieAPI, movieSearch, displayMovies);
		}

		}// end if statement for pressing Enter

	}); //end submit function

}); //end ready
