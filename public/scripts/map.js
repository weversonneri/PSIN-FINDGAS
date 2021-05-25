/* eslint-disable no-undef */
const mymap = L.map('mapid').setView([-15.7977541, -47.8997705], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

const mapIcon = L.icon({
  iconUrl: '/images/gas.svg',
  iconSize: [24, 80],
  iconAnchor: [16, 68],
  popupAnchor: [-3, -42],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const mapIconPro = L.icon({
  iconUrl: '/images/gaspro.svg',
  iconSize: [40, 98],
  iconAnchor: [16, 68],
  popupAnchor: [4, -43],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

// const mapTooltip = L.tooltip({

// });

const popupOptions = {
  maxWidth: '500',
  className: 'custom',
  closeButton: false,
};

const teste = document.getElementById('test');

const getData = async () => {
  try {
    const response = await fetch('/map', {
      method: 'get',
    });

    const data = await response.json();

    data.forEach((item) => {
      if (item.User.subscription === 'P') {
        const marker = L.marker([item.latitude, item.longitude], { icon: mapIconPro }).addTo(mymap);

        const popup = L.popup()
          .setContent(teste);
        marker.bindTooltip('Anúncio').openTooltip();

        marker.bindPopup(popup, popupOptions);
      }

      if (item.User.subscription === 'N') {
        const marker = L.marker([item.latitude, item.longitude], { icon: mapIcon }).addTo(mymap);

        const popup = L.popup()
          .setContent(`<div class="flex items-center justify-between -mx-1.5">
              <p class=" text-xs md:text-sm text-red-900">${item.User.subscription}</p>
              <a href="/provider-detail/${item.id}" class=" ml-2 p-1 bg-blue-500 hover:bg-blue-600 rounded-md " title="Detalhes">
                <svg class="h-5 w-5 stroke-current text-white" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              </div>
        `);
        // marker.bindTooltip(item.subcription).openTooltip();

        marker.bindPopup(popup, popupOptions);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

getData();
