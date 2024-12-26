const socket = io();

const usersList = document.getElementById('users');
const messages = document.getElementById('messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('msg');
const recipientSelect = document.getElementById('recipient');

const username = prompt('Enter your username:');
socket.emit('register', username);

socket.on('users',(users)=>{
    recipientSelect.innerHTML = '<option value="">Broadcast</option>';
    usersList.innerHTML = '';

    Object.entries(users).forEach(([id, name]) => {
        if (id !== socket.id) {
          const option = document.createElement('option');
          option.value = id;
          option.textContent = name;
          recipientSelect.appendChild(option);
        }
    
        const li = document.createElement('li');
        li.textContent = name;
        usersList.appendChild(li);
      });

});

socket.on('message',({ sender, message, isSender })=>{
    const li = document.createElement('li');
    if (isSender) {
        li.classList.add('list-group-item', 'list-group-item-primary');
        li.textContent = `You: ${message}`;
      } else {
        li.classList.add('list-group-item', 'list-group-item-info');
        li.textContent = `${sender}: ${message}`;
      }
      messages.appendChild(li);
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = input.value;
    const recipientId = recipientSelect.value;

    if (msg) {
        socket.emit('privateMessage', { recipientId, message: msg });
        input.value = ''; 
      }
});