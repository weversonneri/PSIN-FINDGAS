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

const popupOptionsPro = {
  maxWidth: '500',
  className: 'custom-pro',
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
          .setContent(`<div id="" class="flex max-w-xs -m-1.5">
          <div class="">
            <div class=" space-y-0.5">
              <p class=" text-xs text-gray-900">Gas de cozinha 13Kg</p>
              <p class=" text-base md:text-lg text-gray-900 font-bold">R$ 85,00</p>
              <p class=" text-sm md:text-base text-gray-900 break-words">${item.name}</p>
            </div>

            <a href="https://api.whatsapp.com/send?phone=${item.phone}&text=${item.name}" target="_blank"
              class=" flex items-center space-x-1">
              <i class="fab fa-whatsapp stroke-current text-green-800 text-sm sm:text-base"></i>
              <p class=" text-xs sm:text-sm">${item.phone}</p>
            </a>
          </div>
          <a href="/provider-detail/${item.id}"
            class=" ml-4 my-4 p-1 flex items-center bg-blue-500 hover:bg-blue-600 rounded-md " title="Detalhes">
            <svg class="h-5 w-5 stroke-current text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>`);
        marker.bindTooltip('Anúncio').openTooltip();

        marker.bindPopup(popup, popupOptionsPro).openPopup();
      }

      if (item.User.subscription === 'N') {
        const marker = L.marker([item.latitude, item.longitude], { icon: mapIcon }).addTo(mymap);

        const popup = L.popup()
          .setContent(`<div class="flex max-w-xs -m-1.5">
          <div class=" -space-y-3 ">
            <div class=" -space-y-0.5 ">
              <p class=" text-xs text-gray-800">Gas de cozinha 13Kg</p>
              <p class=" text-sm text-gray-800 font-bold">R$ 85,00</p>
              <p class=" text-xs text-gray-900 break-words">Deposito nome</p>
            </div>

            <a class=" flex items-center space-x-1">
              <i class="fas fa-phone-alt stroke-current text-gray-800 text-xs"></i>
              <p class=" text-xs text-gray-800">(61)9 999-9999</p>
            </a>
          </div>
          <a href="/provider-detail/${item.id}"
            class=" ml-4 my-4 p-1 flex items-center bg-blue-500 hover:bg-blue-600 rounded-md " title="Detalhes">
            <svg class="h-4 w-4 stroke-current text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
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
