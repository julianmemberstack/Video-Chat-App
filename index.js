// Initialize the meeting
function initializeMeeting() {
  window.VideoSDK.config(TOKEN);

  meeting = window.VideoSDK.initMeeting({
    meetingId: meetingId, // required
    name: "Thomas Edison", // required
    micEnabled: true, // optional, default: true
    webcamEnabled: true, // optional, default: true
  });

  meeting.join();

  // Creating local participant
  createLocalParticipant();

  // Setting local participant stream
  meeting.localParticipant.on("stream-enabled", (stream) => {
    setTrack(stream, null, meeting.localParticipant, true);
  });

  // meeting joined event
  meeting.on("meeting-joined", () => {
    textDiv.style.display = "none";
    document.getElementById("grid-screen").style.display = "block";
    document.getElementById(
      "meetingIdHeading"
    ).textContent = `Meeting Id: ${meetingId}`;
  });

  // meeting left event
  meeting.on("meeting-left", () => {
    videoContainer.innerHTML = "";
  });

  // Remote participants Event
  // participant joined
  meeting.on("participant-joined", (participant) => {
    //  ...
  });

  // participant left
  meeting.on("participant-left", (participant) => {
    //  ...
  });
}

// Getting Elements from DOM
const joinButton = document.getElementById("joinBtn");
const leaveButton = document.getElementById("leaveBtn");
const toggleMicButton = document.getElementById("toggleMicBtn");
const toggleWebCamButton = document.getElementById("toggleWebCamBtn");
const createButton = document.getElementById("createMeetingBtn");
const videoContainer = document.getElementById("videoContainer");
const textDiv = document.getElementById("textDiv");

// Declare Variables
let meeting = null;
let meetingId = "";
let isMicOn = false;
let isWebCamOn = false;

function initializeMeeting() {}

function createLocalParticipant() {}

function createVideoElement() {}

function createAudioElement() {}

function setTrack() {}

// Join Meeting Button Event Listener
joinButton.addEventListener("click", async () => {
  document.getElementById("join-screen").style.display = "none";
  textDiv.textContent = "Joining the meeting...";

  roomId = document.getElementById("meetingIdTxt").value;
  meetingId = roomId;

  initializeMeeting();
});

// Create Meeting Button Event Listener
createButton.addEventListener("click", async () => {
  document.getElementById("join-screen").style.display = "none";
  textDiv.textContent = "Please wait, we are joining the meeting";

  // API call to create meeting
  const url = `https://api.videosdk.live/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: TOKEN, "Content-Type": "application/json" },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => alert("error", error));
  meetingId = roomId;

  initializeMeeting();
});