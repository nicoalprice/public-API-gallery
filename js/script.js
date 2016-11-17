$document.ready(function() {

	// User enters a search term
	// Receive JSON response
	// Add a link and <img> tag to page

	//When search button is submitted...
	$('form').submit( function() {
	// Javascript retrieves that search term
	var userSearch = //form input
	var openLibraryAPI = 'http://openlibrary.org/search.json?q=';
		openLibraryAPI += 'userSearch';
	var options;
	function displayBooks(data) {
		var bookHTML = ''<ul id="gallery">';
		$.each(data.items, function(i, book) {
			bookHTML += '<li>';
			bookHTML += '<a href="https://openlibrary.org/api/books?bibkeys=OLID:';
			bookHTML += 'book.docs.key"';
			bookHTML +='</a><img src="book.docs.cover_i"/>';
			bookHTML +='</li>';
		});
		bookHTML += '</ul>';
	};
	// Make a GET request to OpenLibrary, sending the search term along
	$.getJSON(openLibraryAPI, options, displayBooks;
	}); //end submit function


}); //end ready

	/*

	put key from search after colon
	&bibkeys=OLID:OL123M
