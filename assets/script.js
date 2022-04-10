function headerDate() {
    var currentHeaderDate= moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

headerDate();