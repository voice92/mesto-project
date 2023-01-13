import '../styles/index.css';
import {openPopup, closePopup} from './modal.js';
import {enableValidation} from "./validate";
import {createCard} from "./card";

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

const crossButtons = document.querySelectorAll('.popup__close-button')
const cardsContainer = document.querySelector('.elements__grid-container')

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
  openPopup(cardPopup)
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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
