/* eslint no-undef: 0 */
// Creating an array of all the usernames we want to pull data from
var channels = [
  'ESL_SC2',
  'OgamingSC2',
  'freecodecamp',
  'cretetion',
  'syndicate',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas'
];

// Created a skeleton of an html row made into a string to easily update data
var skeleton =
  '<li id="identifier">' +
    '<div class="row vertical-align">' +
      '<div class="col-xs-2">' +
        '<a href="url">' +
          '<img class="icon img-responsive" src="./assets/placeholder.png" alt="">' +
        '</a>' +
      '</div>' +
      '<div class="col-xs-4">' +
        '<div class="display-name">channel-name</div>' +
        '<div class="liveclick"></div>' +
      '</div>' +
      '<div class="col-xs-6">' +
        '<div class="status">Loading...</div>' +
      '</div>' +
    '</div>' +
    '<div class="row">' +
      '<div class="col-xs-12 livestream">' +
        '<div id="identifier-player"></div>' +
      '</div>' +
    '</div>' +
    '<hr/>' +
  '</li>';

$(document).ready(function () {
  // Setup buttons handlers
  $('#online-btn').click(function () {
    $('.offline').hide();
    $('.online').show();
  });

  $('#offline-btn').click(function () {
    $('.online').hide();
    $('.offline').show();
  });

  $('#all-btn').click(function () {
    $('.online, .offline').show();
  });

  // Search bar
  $('#search-input').keyup(function () {
    var valThis = this.value.toLowerCase();
        // length = this.value.length;
    $('#channels>li').each(function () {
      var text = $(this).text();
      var textL = text.toLowerCase();
      if (textL.indexOf(valThis) >= 0) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Loop through all elements and fetch data from the api
  channels.forEach(function (channel) {
    var channelId = '#' + channel;

    // Prepare the tag by replacing values in the skeleton
    var channelTag = skeleton.replace('channel-name', channel);
    channelTag = channelTag.replace(/identifier/g, channel);

    // Add the tag to the #channels container
    $('#channels').append(channelTag);

    // Fetch using the api
    $.ajax({
      dataType: 'json',
      url: 'https://wind-bow.glitch.me/twitch-api/streams/' + channel,
      success: function (data) {
        var stream = data.stream;

        // If the stream is null, it means that the channel is not streaming
        // right now
        if (stream != null) {
          $(channelId + ' .status').html(stream.channel.status);
          $(channelId + ' .icon').attr('src', stream.channel.logo);
          $(channelId).attr('class', 'online');
          $(channelId + ' a').attr('href', stream.channel.url);
          $(channelId + ' .liveclick').html('(LIVE:Click to Watch)');

          $(channelId).click(function (event) {
            if ($(channelId + ' iframe').length > 0) {
              $(channelId + ' iframe').remove();
            } else {
              var player = new Twitch.Player(channel + '-player', {
                width: 636 - 7 - 7,
                height: 300,
                channel: channel
              });
            }
          });
        } else {
          $(channelId + ' .status').html('Offline');
          $(channelId).attr('class', 'offline');

          // We are missing data for the offline channels, we need to access the channels endpoint
          // on the api to get more information
          $.ajax({
            dataType: 'json',
            url: 'https://wind-bow.glitch.me/twitch-api/channels/' + channel,
            success: function (data) {
              $(channelId + ' .icon').attr('src', data.logo);
              $(channelId + ' a').attr('href', data.url);
            }
          });
        }
      }
    });
  });
});
