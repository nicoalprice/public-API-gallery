$(document).ready(function() {

	// User enters a search term
	// When user hits enter key...
	$('#search').keypress(function(e) {
		if (e.which == 13) { // enter
			e.preventDefault;

	// Get search term
		var userSearch = $('input#search').serialize();
		alert(userSearch);

	// Construct search url
		var openLibraryAPI = 'http://openlibrary.org/search.json?';
		openLibraryAPI += userSearch;
		alert(openLibraryAPI);

	// Get records for first 10 results and display covers
		var options;

		function displayBooks(bookData) {
			var bookHTML = '<ul>';
			for (i=0; i<10; i++) {
//			$.each(data.items, function(i, book) {
				bookHTML += '<li>';
				bookHTML += '<a href="https://openlibrary.org/api/books?bibkeys=OLID:';
				bookHTML += book[i].docs.edition_key + '"</a>';
				bookHTML +='<img src="p://covers.openlibrary.org/b/OLID/"';
				bookHTML += book[i].docs.edition_key;
				bookHTML += '/-M.jpg" />';
				bookHTML +='</li>';

			} // end loop

			bookHTML += '</ul>';
			console.log(bookHTML); //

			$('#gallery').html(bookHTML);
		} // end displayBooks




		// Make a GET request to OpenLibrary, sending the search term along
		$.getJSON(openLibraryAPI, options, displayBooks);

					} // end if statement

	}); //end submit function

}); //end ready
