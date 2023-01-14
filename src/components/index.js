import '../styles/index.css';
import {openPopup, closePopup} from './modal.js';
import {enableValidation} from "./validate";
import {createCard} from "./card";
import {fetchCards, updateUser, addCard, updateAvatar} from './api';

const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarPopup = document.querySelector('#popup-edit_avatar')
const profileAvatarPopupTrigger = document.querySelector('.profile__avatar-edit')
const profileAvatarForm = profileAvatarPopup.querySelector('.popup__form')
const profileAvatarLink = profileAvatarForm.querySelector('input[name="link"]')
const profileAvatarSubmitButton = profileAvatarForm.querySelector('button[type="submit"]')

const profilePopup = document.querySelector('#popup-edit')
const profilePopupTrigger = document.querySelector('.profile__button-edit')
const profileTitle = document.querySelector('.profile__title-text')
const profileDesc = document.querySelector('.profile__subtitle')
const profileForm = profilePopup.querySelector('.popup__form')
const profileNameInput = profileForm.querySelector('input[name="name"]')
const profileDescInput = profileForm.querySelector('input[name="description"]')
const profileSubmitButton = profileForm.querySelector('button[type="submit"]')

const cardPopup = document.querySelector('#card-popup')
const cardPopupTrigger = document.querySelector('.profile__button-add')
const cardPopupForm = cardPopup.querySelector('form')
const cardNameInput = cardPopup.querySelector('input[name="name"]')
const cardLinkInput = cardPopup.querySelector('input[name="link"]')
const cardSubmitButton = cardPopupForm.querySelector('button[type="submit"]')

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

fetchCards()
  .then(cards => {
    cards.forEach(function (item) {
      const card = createCard(item._id, item.name, item.link, item.likes.length)
    
      cardsContainer.append(card)
    })
  })
  .catch(error => {
    console.log(error)
  })

function setLoading(submitButton) {
  const sourceText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  return function () {
    submitButton.textContent = sourceText;
  }
}

profileAvatarPopupTrigger.addEventListener('click', function () {
  openPopup(profileAvatarPopup);
});

profileAvatarForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const removeLoading = setLoading(profileAvatarSubmitButton);

  updateAvatar(profileAvatarLink.value)
    .then(user => {
      profileAvatar.src = user.avatar;
      closePopup(profileAvatarPopup)
      removeLoading();
    })
    .catch(error => {
      console.log(error)
    })
});

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

  const removeLoading = setLoading(cardSubmitButton)

  addCard(cardNameInput.value, cardLinkInput.value)
    .then(updatedCard => {
      const card = createCard(updatedCard.name, updatedCard.link)

      cardsContainer.prepend(card)
      closePopup(cardPopup)

      cardPopupForm.reset()
      removeLoading();
    })
    .catch(error => {
      console.log(error)
    })
})

profileForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const removeLoading = setLoading(profileSubmitButton)

  updateUser(profileNameInput.value, profileDescInput.value)
    .then(user => {
      profileTitle.textContent = user.name
      profileDesc.textContent = user.about

      closePopup(profilePopup)

      removeLoading()
    })
    .catch(error => {
      console.log(error)
    })
})

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
