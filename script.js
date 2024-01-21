// This is the JavaScript file for the Alarm Clock web application

document.addEventListener("DOMContentLoaded", function () {
  updateTime();
  setInterval(updateTime, 1000);
  setInterval(checkAlarm, 1000); // Check for alarm every second
});

let audio = new Audio("./static/sound.mp3"); // Replace with the path to your sound file

function setAlarm() {
  const hours = document.getElementById("hours").value;
  const minutes = document.getElementById("minutes").value;
  const ampm = document.getElementById("ampm").value;

  if (String(hours) === "" || String(minutes) === "") {
    alert("Fill all the fields to set alarm!");
  } else {
    const alarmTime = `${hours}:${padZero(minutes)} ${ampm}`;

    // Save the alarm time in localStorage
    localStorage.setItem("alarmTime", alarmTime);
    const storedAlarmTime = localStorage.getItem("alarmTime");
    addAlarmToList(storedAlarmTime);
  }
}

function checkAlarm() {
  const storedAlarmTime = localStorage.getItem("alarmTime");

  if (storedAlarmTime) {
    const now = new Date();
    const currentTime = `${now.getHours() % 12 || 12}:${padZero(
      now.getMinutes()
    )} ${now.getHours() >= 12 ? "PM" : "AM"}`;

    if (storedAlarmTime === currentTime) {
      // Play sound when alarm time matches current time
      audio.play();
      // Clear the stored alarm time
      localStorage.removeItem("alarmTime");
      // Add the alarm to the list
      //   addAlarmToList(storedAlarmTime);
    }
  }
}

function addAlarmToList(alarmTime) {
  const alarmList = document.getElementById("alarmList");
  const listItem = document.createElement("li");
  listItem.innerText = alarmTime;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "btn btn-danger btn-sm ml-2 rounded-pill";
  deleteButton.onclick = function () {
    alarmList.removeChild(listItem);
    localStorage.removeItem("alarmTime");
  };

  listItem.appendChild(deleteButton);
  alarmList.appendChild(listItem);
}

function updateTime() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  document.getElementById("time").innerText = `${hours}:${padZero(
    minutes
  )}:${padZero(seconds)} ${ampm}`;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle.checked) {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  }
}
