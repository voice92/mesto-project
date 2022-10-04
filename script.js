const OPEN_CLASS_NAME = 'popup_opened'
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector('.profile__button-edit')
const closeButton = document.querySelector('.popup__close-button')
const editPopup = document.querySelector('#popup-edit')
const editForm = editPopup.querySelector('.popup__form')
const nameInput = editForm.querySelector('input[name="name"]')
const descInput = editForm.querySelector('input[name="description"]')
const nameElement = document.querySelector('.profile__title-text')
const descElement = document.querySelector('.profile__subtitle')

const cardPopupCloseBtn = document.querySelector('#card-popup-close-btn')
const addButton = document.querySelector('.profile__button-add')
const cardPopup = document.querySelector('#card-popup')
const addCardForm = cardPopup.querySelector('form')
const cardsContainer = document.querySelector('.elements__grid-container')

const imgPopup = document.querySelector('#img-popup')
const imgPopupCloseBtn = document.querySelector('#img-popup-close-btn')
const popupImgElement = document.querySelector('.popup__img')
const popupTitleElement = document.querySelector('.popup__img-text')

function getCard(name, link) {
  return `
    <li class="element">
        <img src="${link}" alt="Караевск" class="element__image" />
        <div class="element__footer">
            <h2 class="element__title">${name}</h2>
            <button type="button" class="element__button-trash" aria-label="удалить"></button>
            <button class="element__button-like" type="button"></button>
        </div>
    </li>
  `
}

cardsContainer.innerHTML = initialCards.map((item) => getCard(item.name, item.link)).join('')

cardsContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('element__button-like')) {
    event.target.classList.toggle('element__button-like_liked')
  } else if (event.target.classList.contains('element__button-trash')) {
    event.target.closest('.element').remove()
  } else if (event.target.classList.contains('element__image')) {
    imgPopup.classList.add(OPEN_CLASS_NAME)
    const element = event.target.closest('.element')
    popupImgElement.src = element.querySelector('img').src
    popupTitleElement.textContent = element.querySelector('.element__title').textContent
  }
})



addButton.addEventListener('click', function () {
  cardPopup.classList.add(OPEN_CLASS_NAME)
})

cardPopupCloseBtn.addEventListener('click', function () {
  cardPopup.classList.remove(OPEN_CLASS_NAME)
})

imgPopupCloseBtn.addEventListener('click', function () {
  imgPopup.classList.remove(OPEN_CLASS_NAME)
})

addCardForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const name = cardPopup.querySelector('input[name="name"]').value
  const link = cardPopup.querySelector('input[name="link"]').value
  const cardTemplate = getCard(name, link)

  cardsContainer.insertAdjacentHTML('afterbegin', cardTemplate)
})

editButton.addEventListener('click', function () {
  editPopup.classList.add(OPEN_CLASS_NAME)
})

closeButton.addEventListener('click', function() {
  editPopup.classList.remove(OPEN_CLASS_NAME)

  nameInput.value = nameElement.textContent.trim()
  descInput.value = descElement.textContent.trim()
})

editForm.addEventListener('submit', function (event) {
  event.preventDefault()

  nameElement.textContent = nameInput.value
  descElement.textContent = descInput.value

  editPopup.classList.remove(OPEN_CLASS_NAME)
})
