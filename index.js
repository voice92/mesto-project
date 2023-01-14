const profilePopup = document.querySelector('#popup-edit')
const profilePopupTrigger = document.querySelector('.profile__button-edit')
const profileTitle = document.querySelector('.profile__title-text')
const profileDesc = document.querySelector('.profile__subtitle')
const profileForm = profilePopup.querySelector('.popup__form')
const profileNameInput = profileForm.querySelector('input[name="name"]')
const profileDescInput = profileForm.querySelector('input[name="description"]')

const cardPopup = document.querySelector('#card-popup')
const cardPopupTrigger = document.querySelector('.profile__button-add')
const cardPopupForm = cardPopup.querySelector('form')
const cardNameInput = cardPopup.querySelector('input[name="name"]')
const cardLinkInput = cardPopup.querySelector('input[name="link"]')

const imagePopup = document.querySelector('#img-popup')
const popupImgElement = document.querySelector('.popup__img')
const popupTitleElement = document.querySelector('.popup__img-text')

const crossButtons = document.querySelectorAll('.popup__close-button')

const cardsContainer = document.querySelector('.elements__grid-container')
const cardTemplate = document.querySelector('#element-template')

const POPUP_ACTIVE_CLASS_NAME = 'popup_opened'

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
  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(popup) {
  popup.classList.add(POPUP_ACTIVE_CLASS_NAME)
}

function closePopup(popup) {
  popup.classList.remove(POPUP_ACTIVE_CLASS_NAME)
}

function createCard(name, link) {
  const element = cardTemplate.content.cloneNode(true)
  const elementTitle = element.querySelector('.element__title')
  const elementImage = element.querySelector('.element__image')
  const elementDeleteButton = element.querySelector('.element__button-trash')
  const elementLikeButton = element.querySelector('.element__button-like')

  elementTitle.textContent = name
  elementImage.src = link
  elementImage.alt = name

  elementDeleteButton.addEventListener('click', deleteElement)
  elementLikeButton.addEventListener('click', toggleLike)
  elementImage.addEventListener('click', openImagePopup)

  return element
}

function deleteElement(event) {
  event.target.closest('.element').remove()
}

function toggleLike(event) {
  event.target.classList.toggle('element__button-like_liked')
}

function openImagePopup(event) {
  const targetElement = event.target.closest('.element')
  popupImgElement.src = event.target.src
  popupImgElement.alt = event.target.alt

  popupTitleElement.textContent = targetElement.querySelector('.element__title').textContent
  openPopup(imagePopup)
}

initialCards.forEach(function (item) {
  const card = createCard(item.name, item.link)

  cardsContainer.append(card)
})

profilePopupTrigger.addEventListener('click', function () {
  openPopup(profilePopup)

  profileNameInput.value = profileTitle.textContent.trim()
  profileDescInput.value = profileDesc.textContent.trim()
})

cardPopupTrigger.addEventListener('click', function () {
  openPopup(cardPopup);
  disablecardPopupTrigger(validSetting, cardPopupTrigger);
})

crossButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'))
  })
})

cardPopupForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const card = createCard(cardNameInput.value, cardLinkInput.value)

  cardsContainer.prepend(card)
  closePopup(cardPopup)
  cardNameInput.value = ''
  cardLinkInput.value = ''
})

profileForm.addEventListener('submit', function (event) {
  event.preventDefault()

  profileTitle.textContent = profileNameInput.value
  profileDesc.textContent = profileDescInput.value

  closePopup(profilePopup)
})

