// Global variables
let currentUser = '';
let currentChat = '';
let messages = JSON.parse(localStorage.getItem('messages')) || {};
let friends = JSON.parse(localStorage.getItem('friends')) || [];
let groups = JSON.parse(localStorage.getItem('groups')) || [];

// Login function
function login() {
  const username = document.getElementById('username').value;
  if (username.trim()) {
    currentUser = username;
    localStorage.setItem('currentUser', username);
    window.location.href = 'chat.html';
  } else {
    alert('Please enter a username.');
  }
}

// Add friend
function addFriend() {
  const friendName = document.getElementById('newFriend').value.trim();
  if (friendName && !friends.includes(friendName)) {
    friends.push(friendName);
    localStorage.setItem('friends', JSON.stringify(friends));
    loadFriends();
  }
  document.getElementById('newFriend').value = '';
}

// Create group
function createGroup() {
  const groupName = document.getElementById('newGroup').value.trim();
  if (groupName && !groups.includes(groupName)) {
    groups.push(groupName);
    localStorage.setItem('groups', JSON.stringify(groups));
    loadGroups();
  }
  document.getElementById('newGroup').value = '';
}

// Load friends and groups
function loadFriends() {
  const friendsList = document.getElementById('friendsList');
  friendsList.innerHTML = '';
  friends.forEach(friend => {
    const li = document.createElement('li');
    li.textContent = friend;
    li.onclick = () => selectChat(friend);
    friendsList.appendChild(li);
  });
}

function loadGroups() {
  const groupsList = document.getElementById('groupsList');
  groupsList.innerHTML = '';
  groups.forEach(group => {
    const li = document.createElement('li');
    li.textContent = group;
    li.onclick = () => selectChat(group);
    groupsList.appendChild(li);
  });
}

// Select a friend or group to chat
function selectChat(name) {
  currentChat = name;
  document.getElementById('chatWith').innerText = `Chat with ${name}`;
  loadMessages();
}

// Send a message
function sendMessage() {
  const messageText = document.getElementById('message').value;
  if (messageText.trim()) {
    const message = {
      text: messageText,
      user: currentUser,
      time: new Date().toLocaleTimeString()
    };

    if (!messages[currentChat]) messages[currentChat] = [];
    messages[currentChat].push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    displayMessage(message);
    document.getElementById('message').value = '';
  }
}

// Display messages
function loadMessages() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML = '';

  if (messages[currentChat]) {
    messages[currentChat].forEach(displayMessage);
  }
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function displayMessage(message) {
  const chatWindow = document.getElementById('chatWindow');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `<strong>${message.user}</strong>: ${message.text}`;
  chatWindow.appendChild(messageDiv);
}

// Search functionality
function searchContacts() {
  const search = document.getElementById('search').value.toLowerCase();
  const contacts = [...friends, ...groups].filter(contact =>
    contact.toLowerCase().includes(search)
  );

  const contactsList = document.getElementById('contactsList');
  contactsList.innerHTML = '';
  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.textContent = contact;
    li.onclick = () => selectChat(contact);
    contactsList.appendChild(li);
  });
}
