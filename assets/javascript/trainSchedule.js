var database = firebase.database();
console.log(database);

database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();
    // below, will need to calculate next arrival, minutes away?
    // var monthsDiff = moment().diff(moment(data.start), "months");

    var timePassed = moment().diff(moment(data.firstTrainTime), "minutes");
    var nextTrain = moment(data.firstTrainTime) + Math.ceil(timePassed / frequency);
    console.log(nextTrain);

    console.log(data);
    $("table").append(
        `<tr>
            <td>${data.name}</td>
            <td>${data.destination}</td>
            <td>${data.frequency}</td>
            <td>${nextArrival}</td> 
            <td>${minutesAway}</td>
            
        </tr>`
    );
});


$("button").on("click", function () {
    // collect all the data from the form
    var trainName = $("#trainName").val();
    var destination = $("#destination").val();
    var firstTrainTime = $("#firstTrainTime").val();
    var frequency = $("#frequency").val();

    // clear these fields
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

    console.log(trainName, destination, firstTrainTime, frequency);
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
});