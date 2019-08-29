$('#connectBtn').on("click", function () {
  var client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  client.on("connect", function () {
    $('#status').val("Successfully connected!").css("color", "black").css("background-color", "#13d641");
  })

  $('#disconnectBtn').on("click", function () {
      client.end();
      $('#status').val("Disconnected!").css("color", "black").css("background-color", "#c71906");
  })

  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
    //adding to table the topic and payload
    $('#table').append('<tr><td id="topicLng">' + topic + '</td><td id="payloadLng">' + payload + '</td><td id="time">' + moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
    $('#remove').remove();
  })

  $('#publishBtn').on("click", function () {
    client.publish($('#topic').val(), $('#payload').val(), function (err) {
      if (err) {
        alert(err)
      } else {
        console.log("published")
      }
    })
  })
  
  $('#subscribeBtn').on("click", function () {
    // client.subscribe($('#subscriber').val())
    client.subscribe($('#subscriber').val(), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("subscribed")
        $('#subscriber').prop('disabled', true);
      }
    })
  
  })
  
  $('#unsubscribeBtn').on("click", function () {
    $('#subscriber').val("")
    client.subscribe($('#subscriber').val(), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("subscribed")
        $('#subscriber').prop('disabled', true);
      }
    })
    $('#subscriber').prop('disabled', false);
  })
  
})
