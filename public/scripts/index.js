const cards = document.querySelectorAll('.cards .card');
const deleteForm = document.querySelector('#delete-address');

// eslint-disable-next-line no-restricted-syntax
for (const card of cards) {
  const cardId = card.dataset.id;

  const deleteButton = card.querySelector('button.delete');
  deleteButton.onclick = () => {
    deleteForm.setAttribute('action', `/vendordata/delete/${cardId}`);
  };
}
