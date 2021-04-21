/* eslint-disable no-undef */
const mymap = L.map('mapid').setView([-15.7977541, -47.8997705], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);
