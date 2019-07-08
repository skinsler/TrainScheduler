//setup database connection

var config = {
    apiKey: "AIzaSyC3aSzIvyEroIk9OJ4zYYGCTytQw7kV6-0",
    authDomain: "train-scheduler-1ebe6.firebaseapp.com",
    databaseURL: "https://train-scheduler-1ebe6.firebaseio.com",
    projectId: "train-scheduler-1ebe6",
    storageBucket: "train-scheduler-1ebe6.appspot.com",
    messagingSenderId: "833850538022",
    appId: "1:833850538022:web:6397dad97a58dd88"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();

    //get values
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTrainTime = $("#first-train-input").val().trim();

    // Code for the push
    database.ref().push({

        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime
    });

    //clear form
    $("#train-input").val(""); 
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");
  });




database.ref().on("child_added", function(childSnapshot) {

   //calculate next arrival and mintues away

 
   //push first train time back 1 year to make sure it comes before current time
   var firstTrainTime = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");

   var diffTime = moment().diff(moment(firstTrainTime), "minutes");
   var timeRemainder = diffTime % (childSnapshot.val().frequency);
   var minutesAway = (childSnapshot.val().frequency) - timeRemainder;
   var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");





    //Add rows to table

    $("tbody").append(
        "<tr>" +
        "<td>" + childSnapshot.val().trainName + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" + 
        "<td>" + childSnapshot.val().frequency + "</td>" + 
        "<td>" + nextArrival + "</td>" +
        "<td>" + minutesAway + "</td>" +  
        "</td>"
    )
    
    // Handle the errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});  

