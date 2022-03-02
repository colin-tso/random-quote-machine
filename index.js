let data;
let currentQuote;
let currentAuthor;
let colorIndex = 0;
let granimInstance;

var colors = [
    "#2B0948",
    "#421646",
    "#5A2344",
    "#713042",
    "#883E41",
    "#9F4B3F",
    "#B7583D",
    "#CE653B"
];

function getQuotes() {
    return $.ajax({
        async: true,
        crossDomain: true,
        url: "https://type.fit/api/quotes",
        method: "GET",
        success: function (response) {
            data = JSON.parse(response);
            //console.log('data');
            //console.log(data);
        }
    });
}

function randomQuote() {
    //get random quote from JSON object
    quoteData = data[Math.floor(Math.random() * data.length)];
    //get quote text
    currentQuote = quoteData.text;
    //get quote author
    if (quoteData.author === null) {
        currentAuthor = "Anonymous";
    } else {
        currentAuthor = quoteData.author;
    }

    //choose random color from list
    colorIndex = Math.floor(Math.random() * colors.length);

    $("#dummy-text").text(currentQuote);
    let textHeight = $("#dummy-text").outerHeight(true);
    let authorHeight = $("#author").outerHeight(true);
    let buttonsHeight = $(".buttons").outerHeight(true);

    let quoteBoxHeight = textHeight + authorHeight + buttonsHeight - 50;
    console.log(`target box height is: ${quoteBoxHeight}`);

    //update quote content and animate
    $(".quote-content").animate({ opacity: 0 }, 500, function () {
        $(this).animate({ height: quoteBoxHeight }, 500);
        $("#text").text(currentQuote);
        $("#author").text(currentAuthor);
        $(this).animate({ opacity: 1 }, 500);
    });

    //update text color
    $("html body").animate(
        {
            color: colors[colorIndex]
        },
        1000
    );

    //update button background color
    $(".button").animate(
        {
            backgroundColor: colors[colorIndex]
        },
        1000
    );

    //update background gradient color
    granimInstance.changeState(colorIndex + 1);

    $("#tweet-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
}

function startGranim() {

    var canvas = document.getElementById("gradient-canvas");

    granimInstance = new Granim({
        element: canvas,
        direction: "left-right",
        isPausedWhenNotInView: true,
        defaultStateName: 1,
        stateTransitionSpeed: 1000,
        states: {
            1: {
                gradients: [[colors[0], colors[4]]]
            },
            2: {
                gradients: [[colors[1], colors[5]]]
            },
            3: {
                gradients: [[colors[2], colors[6]]]
            },
            4: {
                gradients: [[colors[3], colors[7]]]
            },
            5: {
                gradients: [[colors[4], colors[1]]]
            },
            6: {
                gradients: [[colors[5], colors[0]]]
            },
            7: {
                gradients: [[colors[6], colors[2]]]
            },
            8: {
                gradients: [[colors[7], colors[3]]]
            }
        }
    });
}

$(document).ready(function () {
    startGranim()
    getQuotes().then(() => {
        randomQuote();
    });

    $("#new-quote").on("click", randomQuote);
});
