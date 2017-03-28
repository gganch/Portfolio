$(document).ready(function() {
  function newQuote() {
    $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp",
      },
      success: function(apiResponse) {
        quote = apiResponse.quoteText;
        if (apiResponse.quoteAuthor) {
          author = "- " + apiResponse.quoteAuthor;
          $('#author').html(author);
        } else {
          $('#author').html("Unknown");
        }
        $('#quote').html(quote);
      }
    });
  };
  newQuote();

  $('#new-quote').on('click',function() {
    newQuote();
  });

  $('#tweet-quote').on('click',function(even) {
    event.preventDefault();
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote + " — " + author));
    newQuote();
  });

});
