const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');
const endpoint = 'https://api.github.com/users/d-pagey';
const userEl = document.querySelector('.user');

const danPromise = fetch(endpoint);
danPromise.then(response => {
  return response.json();
}).then(data => {
  console.log(data);
  console.log(data.name);
  console.log(data.blog);
  console.log(data.company);
  userEl.textContent = `${data.name} ${data.company}`;
}).catch(handleError)

function handleError(err) {
  console.log("ERROR!");
  console.log(err);
}

function handleCardButtonClick(event) {
  console.log('CLICK');
  const button = event.currentTarget;
  const card = button.closest('.card');
  const imgDataSrc = card.dataset.alt;
  console.log(imgDataSrc);
  const desc = card.dataset.description;
  console.log(desc);
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
