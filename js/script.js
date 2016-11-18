$(document).ready(function() {

	// User enters a search term
	// Receive JSON response
	// Add a link and <img> tag to page

	//When user hits enter key...
	$('#search').keypress(function(e) {
		if (e.which == 13) { // enter
			e.preventDefault;

	// Javascript retrieves that search term
		var userSearch = $('input#search').serialize();
//		userSearch = userSearch.replace(/ /g, "+");
		alert(userSearch);


		var openLibraryAPI = 'http://openlibrary.org/search.json?';
			openLibraryAPI += userSearch;
			openLibraryAPI += '&jscmd=data&format=json';
			alert(openLibraryAPI);
		var options;

		function displayBooks(data) {
			var bookHTML = '<ul>';
			$.each(data.items, function(i, book) {
				bookHTML += '<li>';
				bookHTML += '<a href="https://openlibrary.org/api/books?bibkeys=OLID:';
				bookHTML += book.docs.edition_key + '&jscmd=data&format=json"';
				bookHTML +='</a><img src="http://covers.openlibrary.org/b/OLID/"' + book.docs.edition_key;
				bookHTML += '/-M.jpg" />'
				bookHTML +='</li>';

				return i < 10; // limit number of displayed
			});

			bookHTML += '</ul>';

			alert(bookHTML);
			$('#gallery').html(bookHTML);
		};
		// Make a GET request to OpenLibrary, sending the search term along
		$.getJSON(openLibraryAPI.docs, options, displayBooks);
	} // end if statement

	}); //end submit function


}); //end ready

//	put key from search after colon
//	&bibkeys=OLID:OL123M
