/* eslint-disable no-unused-vars */
function openModal(key) {
  document.getElementById(key).showModal();
  document.body.setAttribute('style', 'overflow: hidden;');
  document.getElementById(key).children[0].scrollTop = 0;
  document.getElementById(key).children[0].classList.remove('opacity-0');
  document.getElementById(key).children[0].classList.add('opacity-100');
}

function modalClose(key) {
  document.getElementById(key).children[0].classList.remove('opacity-100');
  document.getElementById(key).children[0].classList.add('opacity-0');
  setTimeout(() => {
    document.getElementById(key).close();
    document.body.removeAttribute('style');
  }, 100);
}
