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

			// Callback function to get records for first 10 results and display covers
			function displayBooks(response) {
				console.log(response);
				var bookHTML = '<ul>'; // start gallery list

				if (response.numFound == 0) {
						bookHTML += '<p id="no-results">No results found.</p>';
					}

				else {
				// Loop through search results
					for (i=0; i<100; i++) {
						// Only show titles with cover images
						if (response.docs[i].cover_edition_key != undefined) {
	//					$.each(bookData.docs, function(i, book) {
							bookHTML += '<li>';
							bookHTML += '<a href="http://openlibrary.org/books/';
							bookHTML += response.docs[i].edition_key[0] + '" target="_blank">';
							bookHTML +='<img src="http://covers.openlibrary.org/b/olid/';
							bookHTML += response.docs[i].cover_edition_key;
							bookHTML += '-M.jpg" alt="' + response.docs[i].title + '"/></a>';
							bookHTML += '<p class="book-title">' + response.docs[i].title + '</p>'
							bookHTML +='</li>';
						}
	//					}; // end anonymous function
					}; // end for loop
				} // end else statement

				bookHTML += '</ul>'; // end gallery list
				console.log(bookHTML); // test

				$('#gallery').html(bookHTML);
			}; // end displayBooks


			// Make a GET request to OpenLibrary, sending the search term along
			$.getJSON(openLibraryAPI, userSearch, displayBooks);

		} // end if statement

	}); //end submit function

}); //end ready
