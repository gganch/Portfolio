  $('.wikiform').submit(function (event) {
    event.preventDefault();
    // Get the value of the search field
    var searchTerm = $('#searchTerm').val();
    // Lose the focus
    $('#searchTerm').blur();

    // Handle case where there is no input
    if (searchTerm === '') {
      return;
    }

    // Generate Wikipedia api url and call it
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json&callback=?';
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        // Get heading: data[1][0]
        // Get description: data[2][0]
        // Get link: data[3][0]
        var headings = data[1];
        var descriptions = data[2];
        var links = data[3];
        for (var i = 0; i < headings.length; i++) {
          $('.display-results').append('<li><a href=' + links[i] + '>' + headings[i] + '</a><p>' + descriptions[i] + '</li>');
        }

        $('.container').addClass('searched');
        $('.footer').addClass('hidden');
        // if (searchTerm !== '') {
        //   $('.result-wiki-search-form-input').val(searchTerm);
        //   $('.home').addClass('hidden');
        //   $('.result').removeClass('hidden');
        //   $('.display-results').html('');
        //   $.ajax(searchTerm);
        // }
      //  $('.result').removeClass('hidden').html('');
        //for (var i = 0; i < data[1].length; i++) {
          //$('.display-results').prepend('<li><a href='+ data[3][i]+'>'+data[1][i]+'</a><p>'+data[2][i]);
        //}
      },
      error: function (jqXHR, status, error) {
        console.log('Error:', jqXHR, status, error);
      }
    });
  });
