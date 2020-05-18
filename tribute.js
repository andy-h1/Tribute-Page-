const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleCardButtonClick(event) {
  console.log('CLICK');
  const button = event.currentTarget;
  const card = button.closest('.card');
  const imgSrc = card.querySelector('img').src;
  const imgDataSrc = card.dataset.altImg;
  const desc = card.dataset.description;
  const name = card.querySelector('h2').textContent;
  modalInner.innerHTML = `
    <img width="600" height="600" src="${imgDataSrc}" alt="${name}"/>
    <p>${desc}</p>
    `;
  modalOuter.classList.add('open');
}

cardButtons.forEach(button =>
  button.addEventListener('click', handleCardButtonClick)
);

function closeModal() {
  modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click', event => {
  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
