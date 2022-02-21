const video = document.getElementById("video1");
const audio = document.getElementById("audio1");
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

const btnStart = document.getElementById("start-cam");
const btnStop = document.getElementById("stop-cam");

const constraints = {
  video: {
    width: { min: 540, ideal: 540 },
    height: { min: 360, ideal: 360 },
    aspectRatio: { ideal: 1.5 },
  },
  audio: {
    sampleSize: 16,
    channelCount: 2,
  },
};

btnStart.addEventListener("click", () => {
  camStart();
});

btnStop.addEventListener("click", () => {
  camStop();
});

function camStart() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        window.localStream = stream;
        video.srcObject = stream;
        audio.srcObject = stream;
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function camStop() {
  window.localStream.getTracks().forEach((track) => track.stop());
  video.srcObject = "";
  audio.srcObject = "";
}
