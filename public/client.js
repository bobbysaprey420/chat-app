// var mysql = require('mysql');
// var mysqlConnection = require('../connection');
const socket = io();
let name="";
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key==='Enter') {
        sendMessage(e.target.value)
    }
})



sendMessage=(message)=> {
    let msg = {
        user: name,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    socket.emit('message', msg);
    var value = [[msg.user, msg.message]];
    let sql = "INSERT INTO msg (user, message) VALUES ?"
    mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
}

appendMessage=(msg, type)=> {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className)

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
})


