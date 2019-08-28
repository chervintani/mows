

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
  })
  client.publish($('#topic').val(), $('#payload').val())
})

$('#subscribeBtn').on("click",function(){
  client.subscribe($('#topic').val())
})

$('#unsubscribeBtn').on("click",function(){
  client.subscribe($('#topic').val()+'un')
  $('#subscriber').val("")
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
