const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');
const baseEndpoint = 'https://api.github.com/users';

function handleError(err) {
  console.log("ERROR!");
  console.log(err);
}


function handleCardButtonClick(event) {
  const button = event.currentTarget;
  const card = button.closest('.card');
  const imgDataSrc = card.dataset.alt;
  const desc = card.dataset.description;
  const githubName = card.dataset.github;
  const githubPromise = fetch(`${baseEndpoint}/${githubName}`);
  console.log(githubPromise);
  githubPromise.then(response => {
    return response.json();
  }).then(data => {
    const name = card.querySelector('h2').textContent;
  modalInner.innerHTML = `
    <img width="600" height="600" src="${imgDataSrc}" alt="${name}"/>
    <p>${desc}</p>
    <ul>
    <li>${data.company}</li>
    <li>${data.html_url}
    </ul>
    `;
  modalOuter.classList.add('open');
  }).catch(handleError)
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
