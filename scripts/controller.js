$('#connectBtn').on("click", function () {
  var client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  client.on("connect", function () {
    $('#status').val("Successfully connected!").css("color", "black").css("background-color", "#13d641");
    console.log("connected");
  })

  $('#disconnectBtn').on("click", function () {
    client.end();
    $('#status').val("Disconnected!").css("color", "black").css("background-color", "#c71906");
    console.log("disconnected");
  })

  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
    //adding to table the topic and payload
    $('#table').append('<tr><td id="topicLng">' + topic + '</td><td id="payloadLng">' + payload + '</td><td id="time">' + moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
    $('#remove').remove();
  })

  $('#publishBtn').on("click", function () {
    if ($('#topic').val().length == 0) {
      alert("Please enter a topic");
    } else {
      client.publish($('#topic').val(), $('#payload').val(), function () {
      })
    }
  })

  $(document).on("click",'#subscribeBtn', function () {
    if ($('#subscriber').val().length == 0) {
      alert("Please subscribe a topic");
    } else {
      client.subscribe($('#subscriber').val(), function () {
        console.log("subscribed")
        $('#subscriber').prop('disabled', true);
      })
      $(this).prop('disabled', true);
    }
  })

  $('#unsubscribeBtn').on("click", function () {
    $('#subscriber').val("")
    client.subscribe($('#subscriber').val(), function () {
      console.log("unsubscribed")
      $('#subscriber').prop('disabled', false);
    })
    $('#subscriber').prop('disabled', false);
    $('#subscribeBtn').prop('disabled', false);
  })

})
