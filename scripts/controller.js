var time = new Date($.now());

$('#connectBtn').on("click", function () {
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  client.on("connect", function () {
    $('#status').val("Successfully connected!");
  })
})

$('#disconnectBtn').on("click", function () {
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  client.on("connect", function () {
    client.end();
    $('#status').val("Disconnected!");
  })
})

$('#publishBtn').on("click", function () {
  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
    //adding to table the topic and payload
    $('#table').append('<tr><td id="topicLng">' + $('#topic').val() + '</td><td id="payloadLng">' + $('#payload').val() + '</td><td id="time">' + time + '</td></tr>');
    $('#table').append(topic + payload);
    $('#remove').remove();
  })
  client.publish($('#topic').val(), $('#payload').val())
})

$('#subscribeBtn').on("click", function () {
  client.subscribe($('#subscriber').val())
  $('#subscriber').prop('disabled', true);
})

$('#unsubscribeBtn').on("click", function () {
  $('#subscriber').val("")
  client.subscribe($('#subscriber').val())
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
