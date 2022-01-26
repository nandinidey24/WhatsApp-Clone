const id = JSON.parse(document.getElementById('json-username').textContent);
const message_username = JSON.parse(document.getElementById('json-message-username').textContent);

const socket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/'
    + id
    + '/'
);

socket.onopen = function(e){
    console.log("CONNECTION ESTABLISHED");
}

socket.onclose = function(e){
    console.log("CONNECTION LOST");
}

socket.onerror = function(e){
    console.log("ERROR OCCURED");
}

socket.onmessage = function(e){
    console.log("In onmessage");
    const data = JSON.parse(e.data);
    console.log(data.username);
    console.log(message_username);
    if(data.username == message_username){
        console.log("In sender part");
        document.querySelector('#chat-body').innerHTML += `<tr>
        <td>
            <p class="bg-success p-2 mt-2 mr-5 shadow-sm text-white float-right rounded">
                ${data.message}
            </p>
        </td>
        </tr>`
    }else{
        console.log("In receiver part");
        document.querySelector('#chat-body').innerHTML += `<tr>
        <td>
            <p class="bg-primary p-2 mt-2 mr-5 shadow-sm text-white float-left rounded">
                ${data.message}
            </p>
        </td>
        </tr>`
    }
}

document.querySelector('#chat-message-submit').onclick = function(e){
    //console.log("in function");
    const message_input = document.querySelector('#message_input');
    const message = message_input.value;

    socket.send(JSON.stringify({
        'message':message,
        'username':message_username
    }));

    message_input.value = '';
}

