const socket = io('http://localhost:3000');
const form = document.getElementById('send-container');
const messageContainer = document.querySelector('.container');
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
socket.on('user-joined', name =>{
append(`${name} is online`, 'left')
})
socket.on('receive', data =>{
append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left', name =>{
append(`${name} left the chat`, 'left')
})
socket.on('join-group', groupName => {
socket.join(groupName);
console.log(`${socket.id} joined group ${groupName}`);
}) 
socket.on('send-message', ({ groupName, message, username }) => {
io.to(groupName).emit('receive-message', { message, username });
})
