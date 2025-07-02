
const endpoint = "https://backendwebiot-production.up.railway.app";

function setTaman(taman, status) {
  fetch(`${endpoint}/api/${taman}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  }).then(() => getTamanStatus(taman));
}

function getTamanStatus(taman) {
  fetch(`${endpoint}/api/${taman}`)
    .then(res => res.json())
    .then(data => {
      const img = document.getElementById(`waterTamanImage${taman.replace('taman', '')}`);
      if (data.status === "ON") {
        img.src = "assets/watering-on.png";
      } else {
        img.src = "assets/watering-off.png";
      }
    });
}

['taman1', 'taman2', 'taman3', 'taman4'].forEach(getTamanStatus);
