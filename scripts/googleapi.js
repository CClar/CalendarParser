// Client ID and API key from the Developer Console
var CLIENT_ID = config.clientID;
var API_KEY = config.apiKey;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    // Test
    // test();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
function handleCalendarUpdate(classes) {
  console.log(classes);
  // loop for array of classes
  classes.forEach(element => {
    // loop for array of dates
    element.dates.forEach(classInfo => {
      // take the course name, room, end date, start date
      let event = {
        "summary": "name",
        "location": "location",
        "recurrence": [
          "RRULE:FREQ=WEEKLY;UNTIL=20181010"
        ],
        "start": {
          "dateTime": "2018-09-18T09:00:00-07:00",
          "timeZone": "America/Toronto"
        },
        "end": {
          "dateTime": "2018-09-17T17:00:00-07:00",
          "timeZone": "America/Toronto"
        }
      }
    });
    console.log
  });

}
function test() {
  var event = {
    "summary": "eventTitle",
    "location": "locationString",
    "recurrence": [
      "RRULE:FREQ=WEEKLY;UNTIL=20181010"
    ],
    "start": {
      "dateTime": "2018-09-18T09:00:00-07:00",
      "timeZone": "America/Toronto"
    },
    "end": {
      "dateTime": "2018-09-17T17:00:00-07:00",
      "timeZone": "America/Toronto"
    }
  };

  var request = gapi.client.calendar.events.insert({
    "calendarId": "primary",
    "resource": event
  });

  request.execute(function (event) {
    appendPre('Event created: ' + event.htmlLink);
  });
}