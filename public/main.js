var socket = io();

var form = document.getElementById("form");
var input = document.getElementById("input");
var display = document.getElementById("messageLog");

let user = {};
socket.on("welcome", (data1) => {
  user.name = data1.name;
  user.room = data1.room;
  //  user.room += 3;
  //displayMessage(user);
  console.log("done");
});

socket.on("intimate", (user) => {
  displayMessage(user);
});
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (input.value) {
    user.message = input.value;

    socket.emit("chat message", user);
    console.log("self user name is from client " + user.name);

    displayMessage(user);
    input.value = "";
    input.autofocus = true;
  }
});

socket.on("chat display", (data) => {
  displayMessage(data);
});
//for (let i = 0; i < 4; i++) displayMessage("hey whts upp chat begins");

function displayMessage(data) {
  if (data.message) {
    display.insertAdjacentHTML("beforeEnd", ` <p class = 'msg'>${data.name}>>${data.message} </p>`);
  } else {
    display.insertAdjacentHTML(
      "beforeEnd",
      ` 
    <p class = 'introMsg'>${data.name} has joined the room number ${data.room} </p>`
    );
  }
  display.scrollTo(0, display.scrollHeight);
}
