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
	var publisher;
	var publishPlace;
	var index;

$(document).ready(function() {
	$('input#book-search').prop('checked', true);
	// User enters a search term
	// When user hits enter key...
	$('body').keypress(function(event) {

		if (event.which == 13) { // enter
			event.preventDefault();

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

}); //end ready

/***** FUNCTIONS *****/
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
		if (response.numFound === 0) {
			bookHTML += '<p id="no-results">No results found.</p>';
		}
		else {
			// Loop through search results
			for (i=0; i<100; i++) {
				// If edition_key exists
				if (books[i].edition_key !== undefined) {
					bookHTML += '<li class="' + i +'">';
					bookHTML += '<img src=';
				if (books[i].cover_edition_key !== undefined) {
					bookHTML +='"http://covers.openlibrary.org/b/olid/';
					bookHTML += books[i].cover_edition_key + '-M.jpg"';
				}
				else { // Display default cover image
					bookHTML += '"img/no-cover.png"';
				}
					bookHTML += ' alt="' + books[i].title + '"/>';
					bookHTML += '<p class="title">' + books[i].title + '</p>';
					bookHTML +='</li>';
				} // end edition_key if statement
			} // end for loop
		} // end else statement

		bookHTML += '</ul>'; // end gallery list

		$('#gallery').html(bookHTML); //display books

		// If gallery li is clicked
			$('#gallery li').click(function(event) {
				event.preventDefault();
				index = $(this).attr('class');
				setItemDetails(index, 'book');
				openOverlay('book');
			});
	} // end processBook
}; // end displayBooks

// Callback function to display movie search results
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

function displayMovies(response) {
	movies = response.Search;
	checkMovieSort();
	console.log(response);

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
//		// Show error message if there are no results
		if (response.Response === "False") {
				movieHTML += '<p id="no-results">No results found.</p>';
		}

		else {
			// Loop through search results
			for (i=0; i<movies.length; i++) {
				movieHTML += '<li class="' + i + '">';
				movieHTML +='<img src="';
				// If no movie poster, display default image
				if (movies[i].Poster === "N/A") {
					movieHTML += 'img/no-cover.png" ';
				}
				else {
					movieHTML += movies[i].Poster + '" ';
				}
				movieHTML += 'alt="' + movies[i].Title + '"/></a>';
				movieHTML += '<p class="title">' + movies[i].Title + '</p>';
				movieHTML +='</li>';
			} // end for loop
		} // end else statement

		movieHTML += '</ul>'; // end gallery list

		$('#gallery').html(movieHTML); // display movies

		// If gallery li is clicked
		$('#gallery li').click(function(){
			index = $(this).attr('class');
			setItemDetails(index, 'movie');
			openOverlay('movie');
		});

	}; // end processMovie
}; // end displayMovies

function setItemDetails(itemIndex, itemType) {
	if (itemType == 'book') {
		cover = $(this).children().attr('src');
		if (books[itemIndex].cover_edition_key !== undefined) {
			cover = 'https://covers.openlibrary.org/b/olid/' + books[itemIndex].cover_edition_key + '-M.jpg';
		}
		else { // Display default cover image
			cover = 'img/no-cover.png';
		}
		title = books[itemIndex].title;
		author = books[itemIndex].author_name;
		year = books[itemIndex].first_publish_year;
		publisher = books[itemIndex].publisher;
		if (books[itemIndex].publish_place !== undefined) {
			publishPlace = ' (' + books[itemIndex].publish_place + ')';
		}
		else {
			publishPlace = "";
		}

		updateOverlay('book');
	}

	if (itemType == 'movie') {
		movieID = movies[itemIndex].imdbID;
		getMovieDetails(movieID);
	}

}; // end setItemDetails

function getMovieDetails(movieID) {
	// Send AJAX request
	var plotURL = 'https://www.omdbapi.com/?i=' + movieID + '&plot=short&r=json';

	$.ajax({
		method: 'GET',
		url: plotURL,
		dataType: 'json',
		success: function(data) {
			if (data.Poster === "N/A") {
				cover = 'img/no-cover.png';
			}
			else {
				cover = data.Poster;
			}
			title = data.Title;
			year = data.Year;
			director = data.Director;
			plot = data.Plot;

			updateOverlay('movie');
		}
	}); // end ajax request
}; // getMovieDetails
