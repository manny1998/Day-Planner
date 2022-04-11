//this function uses moment to have a upto date header date function
function headerDate() {
    var currentHeaderDate= moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

//This actions the above header function
headerDate();

// this is the variable that stores the data for the schedule 
var myDaySchedule = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]

//This function is used to display for each element in mydayschedule variable.
myDaySchedule.forEach(function(thisHour) {
    // creates the hourblock rows
    var hourBlockRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourBlockRow);

    // creates hour field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler display with if statement used to color code past, current & future. 
    var hourlyPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourlyPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // creates the save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlans = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlans.append(saveButton);
    hourBlockRow.append(hourField, hourlyPlan, savePlans);
})

// This function saves data to the localStorage
function saveReminders() {
    localStorage.setItem("myDaySchedule", JSON.stringify(myDaySchedule));
}


//This function allows any data in the localStorage to the view
function displayDailyReminders() {
    myDaySchedule.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function existingData() {
    var storedDay = JSON.parse(localStorage.getItem("myDaySchedule"));

    if (storedDay) {
        myDaySchedule = storedDay;
    }

    saveReminders();
    displayDailyReminders();
}

// shows any existing localstorage data
existingData();

// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDaySchedule[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayDailyReminders();
})