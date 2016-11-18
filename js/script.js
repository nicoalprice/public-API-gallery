$(document).ready(function() {

	// User enters a search term
	// Receive JSON response
	// Add a link and <img> tag to page

	//When user hits enter key...
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

//	// Get records for first 10 results
//			function getBookInfo(bookList) {
//				$.each(bookList.items, function(i, book) {
//					var bookData = 'http://openlibrary.org/'
//					bookData += '&bibkeys=OLID:';
//					bookData += book.docs.edition_key;
//					console.log(bookData);
//					return i < 10; // Limit number of books used
//				}
//			)
//			$.getJSON(bookData, options, getBookInfo);
//			}; //end getBookInfo
//
///
//			var options;
//
//
//		function displayBooks(data) {
//			var bookHTML = '<ul>';
//			$.each(data.items, function(i, book) {
//				bookHTML += '<li>';
//				bookHTML += '<a href="https://openlibrary.org/api/books?bibkeys=OLID:';
//				bookHTML += book.docs.edition_key + '&jscmd=data&format=json"';
//				bookHTML +='</a><img src="http://covers.openlibrary.org/b/OLID/"' + book.docs.edition_key;
//				bookHTML += '/-M.jpg" />'
//				bookHTML +='</li>';
//			}
//
//			)}; // end displayBooks
//
//			bookHTML += '</ul>';
//
//			alert(bookHTML);
//			$('#gallery').html(bookHTML);
//		};
//		// Make a GET request to OpenLibrary, sending the search term along
////		$.getJSON(openLibraryAPI, options, displayBooks);
//	// end if statement
//
//	}); //end submit function
//

}); //end ready

//	put key from search after colon
//	&bibkeys=OLID:OL123M
