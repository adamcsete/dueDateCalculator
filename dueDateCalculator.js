/*
Due Date Calculator - Emarsys Homework 
Chosen technology: JavaScript via node.js
Created by Adam Csete
tested via mocha: test/test.js (npm test)
*/

//Implementation of CalculateDueDate method
exports.CalculateDueDate = function (submitDateTime, turnAroundTime) {

  //extract hours from input string
  submitHour = submitDateTime.substring(11, 12) === "0" ? submitDateTime.substring(12, 13) : submitDateTime.substring(11, 13);

  //create date format from input string
  subMonth = submitDateTime.substring(5, 7);
  subDay = submitDateTime.substring(8, 10);
  subYear = submitDateTime.substring(0, 4);
  subTime = submitDateTime.substring(11, 16);
  dateString = subMonth + " " + subDay + ", " + subYear + " " + subTime + ":00";
  let date = new Date(dateString);

  //check if turnaround time is valid
  if (!(0 < turnAroundTime && turnAroundTime < 2920)) {dueDateTime = "Invalid turnaround time";}
  
  //check if date is missing
  else if (submitDateTime === "") {dueDateTime = "Date/time is missing";}
  
  //check if date/time is valid
  else if (isNaN(date.getDate())) {dueDateTime = "Invalid date/time format";}

  //check if submit is on working day
  else if (date.getDay().toString() === "6" || date.getDay().toString() === "0") {dueDateTime = "Submit date is not on working day.";}

  //check if submit is within working hours
  else if (submitHour < 9 || submitHour > 16) {dueDateTime = "Submit time is out of working hours.";}

  //increment day according to turnaround time
  else {
    for (i = 0; i < turnAroundTime / 8; i++) {
      do {
        date.setDate(date.getDate() + 1);
      } 
      while (date.getDay().toString() === "6" || date.getDay().toString() === "0");
    }

    //getDate() + 1 decrements the month's ordinal number, increment is needed
    trimmedMonth = (parseInt(date.getMonth())+1).toString();
    trimmedMonth = trimmedMonth <10 ? trimmedMonth= '0'+trimmedMonth : trimmedMonth;

    //formatting the output
    trimmedDate = date.getDate().toString();
    trimmedDate = trimmedDate <10 ? trimmedDate= '0' + trimmedDate : trimmedDate;
    trimmedHours = date.getHours().toString();
    trimmedHours = trimmedHours <10 ? trimmedHours= '0' + trimmedHours : trimmedHours;
    trimmedMinutes = date.getMinutes().toString();
    trimmedMinutes = trimmedMinutes <10 ? trimmedMinutes= '0' + trimmedMinutes : trimmedMinutes;

    //creating dueDateTime
    dueDateTime = date.getFullYear() + "-" + trimmedMonth + "-" + trimmedDate + " " + trimmedHours + ":" + trimmedMinutes;
  }

  //return incremented dueDateTime
  return dueDateTime;
}

