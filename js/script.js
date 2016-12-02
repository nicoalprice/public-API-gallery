// Declare global variables
	var book;
	var movie;
	var books = [];
	var movies = [];
	var title;
	var cover;
	var movieID;
	var plot;
	var author;
	var director;
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
				// Set variables for sorting
				books = response.docs;
				checkBookSort();
				$('#sortby').change(function() {
					checkBookSort();
				}); // end change function

				// Sort books when sort type is changed
				function checkBookSort() {
						// Sort array
						if ($('option#title-sort').is(':selected')) {
							var titleBooks = books.sort(sortByProperty('title'));
							books = titleBooks;
							processBook();
						}

						else if ($('option#date-sort').is(':selected')){
							var dateBooks = books.sort(sortByProperty('first_publish_year'));
							books = dateBooks;
							processBook();
						}

						else if ($('option#author-sort').is(':selected')) {
							var authorBooks = books.sort(sortByProperty('author_name'));
							books = authorBooks;
							processBook();
						}

						else {
							books = response.docs;
							processBook();
						}
				}; // end checkBookSort


			function processBook(){
				var bookHTML = '<ul>'; // start gallery list
				if (response.numFound == 0) {
						bookHTML += '<p id="no-results">No results found.</p>';
				}
				else {
				// Loop through search results
					for (i=0; i<100; i++) {
						// If edition_key exists
						if (books[i].edition_key) {
							bookHTML += '<li class="' + i +'">';
							bookHTML += '<a href="http://openlibrary.org/books/';
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
							bookHTML +='</li>';
						} // end edition_key if statement
					}; // end for loop
					} // end else statement

				bookHTML += '</ul>'; // end gallery list

				$('#gallery').html(bookHTML); //display books

				// If gallery li is clicked
				$('#gallery li').click(function(event) {
					event.PreventDefault;
					index = $(this).attr('class');
					setItemDetails(index, 'book');
					openOverlay('book');
				});
			} // end processBook
			}; // end displayBooks


			// Callback function to display movie search results
			function displayMovies(response) {
				movies = response.Search;
				checkMovieSort();
				// if user changes sort
				$('#sortby').change(function() {
					checkMovieSort();
				}); // end change function

				// Sort books when sort type is changed
				function checkMovieSort() {
						// Sort array
						if ($('option#title-sort').is(':selected')) {
							var titleMovies = movies.sort(sortByProperty('Title'));
							movies = titleMovies;
							processMovie();
						}

						else if ($('option#date-sort').is(':selected')){
							var dateMovies = movies.sort(sortByProperty('Year'));
							movies = dateMovies;
							processMovie();
						}

						else {
							movies = response.Search;
							processMovie();
						}
				}; // end checkMovieSort

				function processMovie() {

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
					setItemDetails(index, 'movie');
					openOverlay('movie');
				});

				}; // end sort functions
			}; // end displayMovies


		// If book search is checked
		if ($('input#book-search').is(":checked")) {
			// Book search url
			var openLibraryAPI = 'https://openlibrary.org/search.json';
			var bookSearch = $('input#search').serialize();
			$('#author-sort').show();
			// AJAX request to OpenLibrary with search term
			$.getJSON(openLibraryAPI, bookSearch, displayBooks);
		}

		// If movie search is checked
		else if ($('input#movie-search').is(':checked')) {
			// Movie search url
			var movieAPI = 'https://www.omdbapi.com/?';
			// Get search terms
			var movieSearch = 's=' + $('input#search').val();
			// Hide author sort when movie is checked
			$('#author-sort').hide();
			// AJAX request to OMDB with search term
			$.getJSON(movieAPI, movieSearch, displayMovies);
		}

		}// end if statement for pressing Enter

	}); //end submit function

	// Sort array by property
	function sortByProperty(property) {
		'use strict';
		return function (a, b) {
			var sortStatus = 0;
			if (a[property] < b[property]) {
				sortStatus = -1;
			} else if (a[property] > b[property]) {
				sortStatus = 1;
			}

		return sortStatus;
		};
	};	// end sortByProperty

}); //end ready

/***** GLOBAL FUNCTIONS *****/

// Find movie plot using movie's ID
	function getMoviePlot(movieID) {
		// Send AJAX request
		var plotURL = 'https://www.omdbapi.com/?i=' + movieID + '&plot=short&r=json';

		$.ajax({
			method: 'GET',
			url: plotURL,
			async: false, // wait for response before setting plot value
			dataType: 'json',
			success: function(data) {
				plot = data.Plot;
				director = data.Director;
				console.log('plot response: ' + plot);
				console.log('director: ' + director);
			}
		}); // end ajax request
	}; // getMoviePlot

function setItemDetails(itemIndex, itemType) {
		if (itemType == 'book') {
			console.log(books);
			title = books[itemIndex].title;
			author = books[itemIndex].author_name;
			year = books[itemIndex].first_publish_year;
			cover = $(this).children().attr('src');
			if (books[itemIndex].cover_edition_key != undefined) {
				cover = 'http://covers.openlibrary.org/b/olid/' + books[itemIndex].cover_edition_key + '-M.jpg';
			}
			else { // Display default cover image
				cover = 'img/no-cover.png';
			}
		}

		if (itemType == 'movie') {
			movieID = movies[itemIndex].imdbID;
			getMoviePlot(movieID);
			title = movies[itemIndex].Title;
			year = movies[itemIndex].Year;
			if (movies[itemIndex].Poster == "N/A") {
				cover = 'img/no-cover.png';
			}
			else {
				cover = movies[itemIndex].Poster;
			}
		}
	}; // end setItemDetails
