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


let trainName = "";
let destination = "";
let frequency = 0;
let firstTrainTime = 0;
let nextArrival = 0;
let minutesAway = 0;


$("#submit").on("click", function(event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
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



  });




database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrainTime);


    //TODO : Add rows to table

    // full list of items to the well
    // $("#full-member-list").append("<div class='well'><span class='member-name'> " +
    //     childSnapshot.val().name +
    //     " </span><span class='member-email'> " + childSnapshot.val().email +
    //     " </span><span class='member-age'> " + childSnapshot.val().age +
    //     " </span><span class='member-comment'> " + childSnapshot.val().comment +
    //     " </span></div>");

    // Handle the errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});  

//TO DO : Complete calcuated field
function calculateNextArrival(firstTrainTime, frequency) {
    if ( (moment().diff(time, 'minutes') ) < 0 ) {
        firstTrainTime = firstTrainTime.subtract(1, 'day');
    }

    var minAway = calculateMinutesAway(firstTrainTime, frequency);
    console.log("minAway " + minAway);

    var nextArrival = firstTrainTime.add(minAway, 'minutes');
    console.log( ('Addition result' + nextArrival.format('HH:mm') ) );

    return nextArrival;

    
};


//TO DO : Complete calcuated field
function calculateMinutesAway(firstTrainTime, frequency) {
    var diff = moment().diff(moment(firstTrainTime), 'minutes');
    var rem = diff % frequency;
    
 
    console.log("diff " + diff + "freq" + frequency);
    console.log(frequency - rem);
    return (frequency - rem);
    
};


//TO DO: move these calls to 'submit' click handler - calculate fields 
var time = moment('23:50','HH:mm');
var next = calculateNextArrival(time , 25);
console.log("function call " + next.format('HH:mm'));
console.log( moment(moment()).diff( time, 'minutes' ) );