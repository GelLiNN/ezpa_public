/*
Client script to send emails via the forms on EZPA
*/
var mygapi;
var clientId = '27900087721-d5mb5an6b0sjge7vgi3m0rmgi2vggmp7.apps.googleusercontent.com';
var apiKey = 'AIzaSyDmoTS5rTt7cPjG3cJ38UpcAy7gDeZPSuI';
var scopes = 'https://www.googleapis.com/auth/gmail.readonly ' +
    'https://www.googleapis.com/auth/gmail.send';

window.onLoadCallback = function() {
    console.log("callback reached");
    gapi.auth2.init({
        client_id: clientId
    });
    gapi.client.setApiKey(apiKey);
    console.log("callback finished");
}
function handleClientLoad(gapi) {
    mygapi = gapi;
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
    if(authResult && !authResult.error) {
        loadGmailApi();
  } else {
      alert("Error Authorizing Email");
  }
}

function handleAuthClick() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
    }, handleAuthResult);
    return false;
}

function loadGmailApi() {
    gapi.client.load('gmail', 'v1', displayInbox);
}

function sendEmailMessage(headers_obj, message, callback) {
    var email = '';

    for (var header in headers_obj) {
        email += header += ": " + headers_obj[header] + "\r\n";
    }

    email += "\r\n" + message;

    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });

    return sendRequest.execute(callback);
}

// headers, message, callback function
function services_send() {
    sendEmailMessage(
        {
            'To': 'chikn42@gmail.com',
            'From': document.getElementById('comp-itufl45jemailField'),
            'Subject': document.getElementById('comp-itufl45jsubjectField').value
        },
        document.getElementById('comp-itufl45jnameField').value + " " +
        document.getElementById('comp-itufl45jmessageField').value,
        function() {
            alert("message sent!");
        }
    );
}
