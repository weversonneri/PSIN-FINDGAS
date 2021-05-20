/* eslint-disable no-undef */
const mymap = L.map('mapid').setView([-15.7977541, -47.8997705], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

const getData = async () => {
  try {
    const response = await fetch('/map', {
      method: 'get',
    });

    const data = await response.json();

    const myIcon = L.icon({
      iconUrl: '/images/gas.svg',
      iconSize: [38, 95],
      iconAnchor: [16, 68],
      popupAnchor: [4, -43],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });

    data.forEach((item) => {
      const marker = L.marker([item.latitude, item.longitude], { icon: myIcon }).addTo(mymap);

      const popup = L.popup()
        .setContent(`<div class="flex items-center ">
              <p class=" text-xs md:text-sm text-red-900">${item.name}</p>
              <a href="#" class="" title="Detalhes">
              <svg  width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="openModal('open')" alt="Detalhes">
                <rect x="12" y="12" width="40" height="40" rx="10" fill="#17D6EB"/>
                <path d="M26 31.8333H37.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M31.8333 26L37.6666 31.8333L31.8333 37.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </a>
              </div>
              <dialog id="open" class="bg-transparent z-0 relative w-screen h-screen">
                <div
                  class="p-7 flex justify-center items-center fixed left-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 opacity-0">
                  <div class="shadow-lg rounded-md p-4 bg-white dark:bg-gray-800 w-4/5 lg:w-2/4 max-w-max m-auto">
                    <div class="relative">
                      <a href="#">
                        <i class=" absolute inset-y-0 right-0 text-gray-500 hover:text-gray-700 far fa-times"
                            onclick="modalClose('open')" title="Fechar"></i>
                      </a>
                    </div>
                    <div id="mapid" class="w-40 h-40"></div>

                    <div class="w-full h-full text-center">
                      <div class="flex h-full flex-col justify-between">
                        <p class="break-words text-gray-800 dark:text-gray-200 text-lg md:text-xl font-bold mt-4">
                            Excluir endereçossssssssssssssssssssssssddddddddddddddddddddddddddddddd ejsou
                        </p>
                        <p class="break-words text-gray-600 dark:text-gray-400 text-xs py-2 px-6 ">
                            Quer mesmo excluir esse endereço?ssssssssssss
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </dialog>`);

      // marker.bindTooltip(item.subcription).openTooltip();

      const popupOptions = {
        maxWidth: '500',
        className: 'custom', // classname for another popup
        closeButton: false,
      };
      marker.bindPopup(popup, popupOptions);
    });
  } catch (err) {
    console.error(err);
  }
};

getData();
