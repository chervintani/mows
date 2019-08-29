var time = new Date($.now());

$('#connectBtn').on("click", function () {
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  client.on("connect", function () {
    $('#status').val("Successfully connected!").css("color", "black").css("background-color", "#13d641");

  })
})

$('#disconnectBtn').on("click", function () {
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  client.on("connect", function () {
    client.end();
    $('#status').val("Disconnected!").css("color", "black").css("background-color", "#c71906");
  })
})

$('#publishBtn').on("click", function () {
  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
    //adding to table the topic and payload
    $('#table').append('<tr><td id="topicLng">' + topic + '</td><td id="payloadLng">' + payload + '</td><td id="time">' + time + '</td></tr>');
    $('#remove').remove();
  })
  // client.publish($('#topic').val(), $('#payload').val())
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

// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })
//DONE
// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
