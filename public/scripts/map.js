/* eslint-disable no-undef */
const mymap = L.map('mapid').setView([-15.7977541, -47.8997705], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

L.control.locate().addTo(mymap);

const search = new GeoSearch.GeoSearchControl({
  style: 'bar',
  provider: new GeoSearch.AlgoliaProvider(),
});

mymap.addControl(search);

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
          .setContent(`<div id="" class="flex -m-2">
          <div class=" flex flex-col">
            <div class="-space-y-7">
              <p class=" text-xs text-gray-900">Gas de cozinha 13Kg</p>
              <span class="flex items-center space-x-3">
              <small class="text-xs text-gray-900">R$ </small>
              <p class="text-base md:text-lg text-gray-900 font-bold"> ${item.gasprice}</p>
              </span>
              <p class=" text-sm md:text-base text-gray-900 break-words pt-2">${item.name}</p>
            </div>
            <div class=" flex space-x-1">
            <a href="https://api.whatsapp.com/send?phone=+55${item.phone}&text=Olá,%20gastaria%20de%20pedir%20um%20gas." target="_blank"
              class=" flex items-center justify-center space-x-1 mb-3 mt-1 px-2 py-0.5 bg-green-700 rounded-md">
              <i class="fab fa-whatsapp stroke-current text-white text-sm "></i>
              <small class=" text-xs sm:text-sm text-white font-bold">${item.phone}</small>
            </a>
            <a href="/provider-detail/${item.id}"
            class=" mb-3 mt-1 px-2 py-0.5 flex items-center bg-yellow-400 hover:bg-yellow-500 rounded-md " title="Detalhes">
            <svg class="h-4 w-4 stroke-current text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            </a>
          </div>
          </div>
        </div>`);
        marker.bindTooltip('Anúncio',
          {
            direction: 'right', permanent: false, offset: [20, -15], opacity: 0.8,
          }).openTooltip();

        marker.bindPopup(popup, popupOptionsPro);
      }

      if (item.User.subscription === 'N') {
        const marker = L.marker([item.latitude, item.longitude], { icon: mapIcon }).addTo(mymap);

        const popup = L.popup()
          .setContent(`<div class="flex max-w-xs -m-1.5">
          <div class=" -space-y-3 ">
            <div class=" -space-y-0.5 ">
              <p class=" text-xs text-gray-800 -mb-2 ">Gas de cozinha 13Kg</p>
              <p class=" text-sm text-gray-800 font-bold">R$ ${item.gasprice}</p>
              <p class=" text-xs text-gray-900 break-words">${item.name}</p>
            </div>

            <a class=" flex items-center space-x-2">
              <i class="fas fa-phone-alt stroke-current text-gray-800 text-xs"></i>
              <p class=" text-xs text-gray-800">${item.phone}</p>
            </a>
          </div>
          <a href="/provider-detail/${item.id}"
            class=" ml-4 my-3 p-1 flex items-center bg-blue-500 hover:bg-blue-600 rounded-md " title="Detalhes">
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
