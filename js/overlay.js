/* Treehouse Project #---: Public API Gallery */
/* by Nicoal Price */

/* Create a lightbox for viewing full size images when their thumbnails are clicked. Find a jQuery plugin for creating a photo gallery or write your own script. The gallery must include the ability to click on photos and view them in a lightbox. */


/*** OVERLAY ***/

var $overlay = $("<div id='overlay'></div>");
var $image = $("<img id='overlay-image'>");
var $caption = $("<p></p>");
var $exit = $('<div id="exit"><img src="images/icons/exit.png" alt="exit"></div>');
var $prevArrow = $('<div id="prevArrow"><img src="images/icons/left-arrow.png" alt="previous" /></div>');
var $nextArrow = $('<div id="nextArrow"><img src="images/icons/right-arrow.png" alt="next" /></div>');
/* Keep track of image index for arrow buttons */
var $index = 0;


/* Add overlay to body of index.html */
$("body").append($overlay);

/* When a thumbnail is clicked... */
$("#gallery a").click(function(event) {

    /* stop click from opening img url */
    event.preventDefault();

    /* get image's href value */
    var imageLocation = $(this).attr("href");

    /* get image's alt text to use as caption */
    var imageCaption =  $(this).children("img").attr("alt");

    /* add exit button. */
    $overlay.append($exit);

     /* call function to capture info for the clicked image */
    updateImage(imageLocation, imageCaption);

    /* add image to overlay */
    $overlay.append($image);

    /* get index for current image */
    $index = $(this).parent().index();

    /* add text captions to the images when viewed in the lightbox. */
    $overlay.append($caption);

    /* add back and forward navigation buttons when lightbox is visible */
    $image.after($prevArrow);
    $image.before($nextArrow);

    /* show the overlay */
    $overlay.fadeIn(1500);
});

/* When the next button is clicked... */
$nextArrow.on("click", function(event) {
    nextImage();
});
/* When right arrow key is pressed... */
$("body").keydown(function(event){
    if ( event.which == 39 ) {
        nextImage();
  }
});

/* When the previous button is clicked... */
$prevArrow.on("click", function(event){
    previousImage();
});

/* When left arrow key is pressed... */
$("body").keydown(function(event){
    if ( event.which == 37 ) {
        previousImage();
  }
});

/* Hide overlay when exit button is clicked. */
$exit.on("click", function() {
    $overlay.fadeOut(1000).hide();
});

/* Hide overlay when esc key is pressed */
$("body").keydown(function(event) {
    if (event.which == 27) {
        $overlay.fadeOut(1000).hide();
    }
});

/*** FUNCTIONS ***/

function updateImage(imageLocation, imageCaption) {
    /* update image source */
    $image.attr("src", imageLocation);
    /* set caption text */
    $caption.text(imageCaption);
}

function nextImage() {
     /* update index */
    $index++;
    /* loop up to first image in gallery */
    if ($index >= $("#gallery li").length) {
        $index = 0;
    }
    /* use index to get next image */
    var nextImage = $("#gallery li").get($index).getElementsByTagName("a");
    /* get new image location and caption */
    var imageLocation = $(nextImage).attr("href");
    var imageCaption =  $(nextImage).children("img").attr("alt");
    /* update the overlay image */
    updateImage(imageLocation, imageCaption);
}

function previousImage() {
    /* update the index */
    $index--;
    /* loop back to last image in gallery */
    if ($index < 0) {
        $index = $("#gallery li").length - 1;
    }
    /* get the previous image by index */
    var prevImage = $("#gallery li").get($index).getElementsByTagName("a");
    /* update the image location and caption */
    var imageLocation = $(prevImage).attr("href");
    var imageCaption =  $(prevImage).children("img").attr("alt");
    /* update the overlay */
    updateImage(imageLocation, imageCaption);
}
