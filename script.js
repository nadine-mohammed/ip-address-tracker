//API KEYS
const IPAPIKey = "";
const mapAccessToken =
  "";

const searchBtn = document.getElementById("search-ico-btn");
const ipAddress = document.getElementById("ip-address");
const loc = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const wrongAlert = document.getElementById("alert-wrong");
const ipInput = document.getElementById("ip-input");
let myMap = document.getElementById("map");

// search for specific IP address
searchBtn.onclick = function () {
  let ipAddressInput = ipInput.value;
  let ipSegments = ipAddressInput.split(".").filter((val) => {
    return val.length > 0 && val >= 0 && val <= 255;
  });
  let dots = ipAddressInput.split("").filter((val) => {
    return val === ".";
  });
  //check ip address validation & get location data for this IP
  if (ipSegments.length === 4 && dots.length === 3) {
    getLocationByIP(ipAddressInput);
  } else {
    wrongAlert.style.display = "block";
    setTimeout(() => {
      wrongAlert.style.display = "none";
    }, 1500);
  }
};
//1-
async function getLocationByIP(ipAddress) {
  try {
    myMap.innerHTML = "<div id='mapid' class='mapid'></div>";
    let url = "https://geo.ipify.org/api/v1?apiKey=" + IPAPIKey;
    if (ipAddress) {
      url += "&ipAddress=" + ipAddress;
    }
    let response = await fetch(url);
    let data = await response.json();
    setLocationInfo(data);
    drawMap(data.location.lat, data.location.lng);
  } catch (e) {
    console.log(e.message);
  }
}
function setLocationInfo(data) {
  ipAddress.innerText = data.ip;
  loc.innerText = data.location.city;
  timezone.innerText = `UCT ${data.location.timezone}`;
  isp.innerText = data.isp;
}
//2-
function drawMap(lat, lng) {
  try {
    var mymap = L.map("mapid").setView([lat, lng], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        mapAccessToken,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
      }
    ).addTo(mymap);
    var marker = L.marker([lat, lng]).addTo(mymap);
  } catch (e) {
    console.log(e.message);
  }
}

getLocationByIP();
