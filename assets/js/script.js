// save reference to important DOM elements
var timeDisplayEl = $('#time-display');
var projectDisplayEl = $('#project-display');
var projectModalEl = $('#project-modal');
var projectFormEl = $('#project-form');
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var hourlyRateInputEl = $('#hourly-rate-input');
var dueDateInputEl = $('#due-date-input');

function printProjectData(name, type, hourlyRate, dueDate) {
    var projectRowEl = $('<tr>');

    var projectNameTdEl = $('<td>').addClass('p-2').text(name);

    var projectTypeTdEl = $('<td>').addClass('p-2').text(type);

    var rateTdEl = $('<td>').addClass('p-2').text(hourlyRate);

    var dueDateTdEl = $('<td>').addClass('p-2').text(dueDate);

    var daysToDate = moment(dueDate, 'MM/DD/YYYY').diff(moment(), 'days');
    var daysLeftTdEl = $('<td>').addClass('p-2').text(daysToDate);

    var totalEarnings = calculateTotalEarnings(hourlyRate, daysToDate);

    // You can also chain methods onto new lines to keep code clean
    var totalTdEl = $('<td>')
        .addClass('p-2')
        .text('$' + totalEarnings);

    var deleteProjectBtn = $('<td>')
        .addClass('p-2 delete-project-btn text-center')
        .text('X');

    // By listing each `<td>` variable as an argument, each one will be appended in that order
    projectRowEl.append(
        projectNameTdEl,
        projectTypeTdEl,
        rateTdEl,
        dueDateTdEl,
        daysLeftTdEl,
        totalTdEl,
        deleteProjectBtn
    );

    projectDisplayEl.append(projectRowEl);

    projectModalEl.modal('hide');
}

function calculateTotalEarnings(rate, days) {
    var dailyTotal = rate * 8;
    var total = dailyTotal * days;
    return total;
}

function handleProjectFormSubmit(event) {
    event.preventDefault();

    var projectName = projectNameInputEl.val().trim();
    var projectType = projectTypeInputEl.val().trim();
    var hourlyRate = hourlyRateInputEl.val().trim();
    var dueDate = dueDateInputEl.val().trim();

    printProjectData(projectName, projectType, hourlyRate, dueDate);

    projectFormEl[0].reset()
}

function handleDeleteProject(event) {
    console.log(event.target);
    var btnClicked = $(event.target);
    btnClicked.parent('tr').remove();
}


dueDateInputEl.datepicker({ minDate: 1 });
projectDisplayEl.on("click", ".delete-project-btn", handleDeleteProject);
projectFormEl.on("submit", handleProjectFormSubmit)

setInterval(function () {
    var nowObj = moment();

    var nowString = nowObj.format("YYYY-MM-DD hh:mm:ss");

    $("#time-display").text(nowString);
}, 1000);


