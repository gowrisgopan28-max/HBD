/* ==========================================
   SIMPLE SCRAPBOOK PAGE TURNING
========================================== */


/* ------------------------------------------
   GET ELEMENTS
------------------------------------------ */

const coverScreen = document.getElementById("coverScreen");

const openBook = document.getElementById("openBook");

const albumContainer =
    document.getElementById("albumContainer");

const album =
    document.getElementById("album");

const pages =
    document.querySelectorAll(".page");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");

const pageIndicator =
    document.getElementById("pageIndicator");

const swipeHint =
    document.getElementById("swipeHint");


/* ------------------------------------------
   BASIC SETTINGS
------------------------------------------ */

let currentPage = 0;

let isTurning = false;

let touchStartX = 0;

let touchStartY = 0;

const totalPages = pages.length;


/* ------------------------------------------
   INITIAL PAGE SETUP
------------------------------------------ */

function setupPages() {

    pages.forEach(function(page, index) {

        page.classList.remove("turned");

        page.style.zIndex =
            totalPages - index;

    });

    updateInterface();
}


/* ------------------------------------------
   UPDATE BUTTONS + PAGE NUMBER
------------------------------------------ */

function updateInterface() {

    pageIndicator.textContent =
        (currentPage + 1) +
        " / " +
        totalPages;


    prevButton.disabled =
        currentPage === 0;


    nextButton.disabled =
        currentPage === totalPages - 1;


    if (currentPage > 0) {

        swipeHint.classList.add("hidden");

    } else {

        swipeHint.classList.remove("hidden");

    }
}


/* ------------------------------------------
   OPEN THE ALBUM
------------------------------------------ */

openBook.addEventListener("click", function() {

    coverScreen.classList.add("opened");

    albumContainer.classList.add("visible");

    setupPages();

});


/* ------------------------------------------
   TURN TO NEXT PAGE
------------------------------------------ */

function nextPage() {

    if (isTurning) {
        return;
    }


    if (currentPage >= totalPages - 1) {
        return;
    }


    isTurning = true;


    pages[currentPage].classList.add("turned");


    currentPage++;


    updateInterface();


    setTimeout(function() {

        isTurning = false;

    }, 850);

}


/* ------------------------------------------
   TURN TO PREVIOUS PAGE
------------------------------------------ */

function previousPage() {

    if (isTurning) {
        return;
    }


    if (currentPage <= 0) {
        return;
    }


    isTurning = true;


    currentPage--;


    pages[currentPage].classList.remove("turned");


    updateInterface();


    setTimeout(function() {

        isTurning = false;

    }, 850);

}


/* ------------------------------------------
   BUTTON CONTROLS
------------------------------------------ */

nextButton.addEventListener(
    "click",
    nextPage
);


prevButton.addEventListener(
    "click",
    previousPage
);


/* ------------------------------------------
   KEYBOARD CONTROLS
------------------------------------------ */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            nextPage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousPage();

        }

    }
);


/* ------------------------------------------
   TOUCH / SWIPE
------------------------------------------ */

album.addEventListener(
    "touchstart",
    function(event) {

        if (isTurning) {
            return;
        }


        const touch =
            event.changedTouches[0];


        touchStartX =
            touch.clientX;


        touchStartY =
            touch.clientY;

    },
    {
        passive: true
    }
);


album.addEventListener(
    "touchend",
    function(event) {

        if (isTurning) {
            return;
        }


        const touch =
            event.changedTouches[0];


        const touchEndX =
            touch.clientX;


        const touchEndY =
            touch.clientY;


        const differenceX =
            touchEndX - touchStartX;


        const differenceY =
            touchEndY - touchStartY;


        /*
           Ignore mostly vertical swipes.
        */

        if (
            Math.abs(differenceX) <
            Math.abs(differenceY)
        ) {

            return;

        }


        /*
           Small movements are ignored.
        */

        if (
            Math.abs(differenceX) < 50
        ) {

            return;

        }


        /*
           Swipe LEFT = next page
           Swipe RIGHT = previous page
        */

        if (differenceX < 0) {

            nextPage();

        } else {

            previousPage();

        }

    },
    {
        passive: true
    }
);


/* ------------------------------------------
   START
------------------------------------------ */

setupPages();
