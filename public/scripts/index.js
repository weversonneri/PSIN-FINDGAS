const cards = document.querySelectorAll('.cards .card');
const deleteForm = document.querySelector('#delete-vendordata');

// eslint-disable-next-line no-restricted-syntax
for (const card of cards) {
  const cardId = card.dataset.id;

  const deleteButton = card.querySelector('#buttondelete');
  deleteButton.addEventListener('click', () => {
    deleteForm.setAttribute('action', `/vendordata/delete/${cardId}`);
  });
}
