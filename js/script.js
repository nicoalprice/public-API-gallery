// Global Variables
	var book;
	var movie;
	var books = [];
	var movies = [];
	var title;
	var cover;
	var movieID;
	var plot;
	var author;
	var year;
	var index;

$(document).ready(function() {

	// User enters a search term
	// When user hits enter key...
	$('body').keypress(function(event) {
		if (event.which == 13) { // enter
			event.preventDefault();

			// Callback function to display book search results
			function displayBooks(response) {
				var bookHTML = '<ul>'; // start gallery list
				books = response.docs;
				console.log(books);

				if (response.numFound == 0) {
						bookHTML += '<p id="no-results">No results found.</p>';
				}
				else {
				// Loop through search results
					for (i=0; i<100; i++) {
						// If edition_key exists
						if (books[i].edition_key) {
							bookHTML += '<li>';
							bookHTML += '<a class="' + i + '" href="http://openlibrary.org/books/';
							bookHTML += books[i].edition_key[0]+ '" target="_blank">';
							bookHTML += '<img src='
							if (books[i].cover_edition_key != undefined) {
								bookHTML +='"http://covers.openlibrary.org/b/olid/';
								bookHTML += books[i].cover_edition_key + '-M.jpg"';
							}
							else { // Display default cover image
								bookHTML += '"img/no-cover.png"';
							}
							bookHTML += ' alt="' + books[i].title + '"/></a>';
							bookHTML += '<p class="title">' + books[i].title + '</p>';
//							bookHTML += '<p class="author">' + books[i].author_name + '</p>';
							bookHTML +='</li>';
						} // end edition_key if statement
					}; // end for loop
					} // end else statement

				bookHTML += '</ul>'; // end gallery list

				$('#gallery').html(bookHTML); //display books

				// If gallery li is clicked
				$('#gallery li a').click(function() {
					index = $(this).attr('class');
					console.log('index: ' + index);
					title = books[index].title;
					author = books[index].author_name;
					year = books[index].first_publish_year;
					cover = $(this).children().attr('src');
					console.log('author: ' + author);
					openOverlay(book);
				});
			}; // end displayBooks


			// Callback function to display movie search results
			function displayMovies(response) {
				movies = response.Search;
				console.log(movies);

				var movieHTML = '<ul>'; // start gallery list

				if (response.Response == false) {
						movieHTML += '<p id="no-results">No results found.</p>';
					}
				else {
					// Loop through search results
					for (i=0; i<movies.length; i++) {
						movieHTML += '<li class="' + i + '">';
						movieHTML +='<img src="';
						// If no movie poster, display default image
						if (movies[i].Poster == "N/A") {
							movieHTML += 'img/no-cover.png" ';
						}
						else {
						movieHTML += movies[i].Poster + '" ';
						}
						movieHTML += 'alt="' + movies[i].Title + '"/></a>';
						movieHTML += '<p class="title">' + movies[i].Title + '</p>';
						movieHTML +='</li>';
					} // end for loop
				} // end if/else statement

				movieHTML += '</ul>'; // end gallery list

				$('#gallery').html(movieHTML); // display movies

				// If gallery li is clicked
				$('#gallery li').click(function(){
					index = $(this).attr('class');
					console.log('movie index: ' + index);
					title = movies[index].Title;
					year = movies[index].Year;
					cover = $(this).children().attr('src');
					movieID = movies[index].imdbID;
					console.log('movieID: ' + movieID);
					openOverlay(movie);
					plot = getMoviePlot(movieID);
					console.log('plot: ' + plot); // shows plot for previous movie?

				});

				// Find movie plot using movie's ID
				function getMoviePlot(movieID) {
					var whatever;
					// Send AJAX request
						var plotGetter = 'i=' + movieID + '&plot=short&r=json';
						var omdbAPI = 'http://www.omdbapi.com/?';
						$.getJSON(omdbAPI, plotGetter, function(plotResponse){
							whatever = plotResponse.Plot;
							console.log('plot response: ' + whatever);
							return whatever;
						});
//
					console.log('whatever again: ' + whatever);
				};

			}; // end displayMovies


		// If book search is checked
		if ($('input#book-search').is(":checked")) {
			// Book search url
			var openLibraryAPI = 'https://openlibrary.org/search.json';
			var bookSearch = $('input#search').serialize();

			// AJAX request to OpenLibrary with search term
			$.getJSON(openLibraryAPI, bookSearch, displayBooks);
		}
		// If movie search is checked
		else if ($('input#movie-search').is(':checked')) {
			// Movie search url
			var movieAPI = 'https://www.omdbapi.com/?';
			// Get search terms
			var movieSearch = 's=' + $('input#search').val();
			// AJAX request to OMDB with search term
			$.getJSON(movieAPI, movieSearch, displayMovies);
		}

		}// end if statement for pressing Enter

	}); //end submit function

}); //end ready
