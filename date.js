"use strict";

const currentDate = document.querySelector(".task-date");
const currentTime = document.querySelector(".task-time");

const today = new Date();

const displayDate = () => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const day = days[today.getDay()];
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return ` ${day}, ${date} ${month} ${year} `;
};

currentDate.innerHTML = displayDate();

const displayTime = () => {
  const time = new Date();
  currentTime.innerHTML = time.toLocaleTimeString();
};

setInterval(displayTime, 1000);
