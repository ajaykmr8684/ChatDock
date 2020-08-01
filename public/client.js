
const socket = io();
const form = document.getElementById("sendContainer");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");

var audio = new Audio("sound.mp3");

//Get Name

const fullName = Qs.parse(location.search, {
  ignoreQueryPrefix:true
});

const name = fullName.firstName;
console.log(name);




const append = (message,position)=>{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position==="left"){
      audio.play();
  }

}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
  messageContainer.scrollTop = messageContainer.scrollHeight;
})



socket.emit('new-user-joined', name); //This is where i need the name so that client side can access the name


socket.on("user-joined", (name)=>{

append(`${name} joined the chat`, "left");
})

socket.on("recieve", (data)=>{

append(`${data.name}: ${data.message} `, "left");
})

socket.on("leave", (name)=>{

  append(`${name} has left the chat`, "left");
})
