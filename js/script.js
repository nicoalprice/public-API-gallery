$(document).ready(function() {

	// User enters a search term
	// When user hits enter key...
	$('#search').keypress(function(e) {
		if (e.which == 13) { // enter
			e.preventDefault();

			// Search url
			var openLibraryAPI = 'https://openlibrary.org/search.json';

			// Get search term
			var userSearch = $('input#search').serialize();
			alert(userSearch); // test

			// Callback function to get records for first 10 results and display covers
			function displayBooks(response) {
				console.log(response);
				var bookHTML = '<ul>'; // start gallery list
				// Loop through search results
				for (i=0; i<10; i++) {
//					$.each(bookData.docs, function(i, book) {
						bookHTML += '<li>';
						bookHTML += '<a href="http://openlibrary.org/books/';
						bookHTML += response.docs[i].edition_key[0] + '" target="_blank">';
						bookHTML +='<img src="http://covers.openlibrary.org/b/olid/';
						bookHTML += response.docs[i].edition_key[0];
						bookHTML += '-M.jpg" /></a>';
						bookHTML +='</li>';
//					}; // end anonymous function
				}; // end for loop

				bookHTML += '</ul>'; // end gallery list
				console.log(bookHTML); // test

				$('#gallery').html(bookHTML);
			}; // end displayBooks


			// Make a GET request to OpenLibrary, sending the search term along
			$.getJSON(openLibraryAPI, userSearch, displayBooks);

		} // end if statement

	}); //end submit function

}); //end ready
