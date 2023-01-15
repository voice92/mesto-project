import '../styles/index.css';
import {
  profileAvatar,
  profileAvatarPopup,
  profileAvatarForm,
  profileAvatarLink,
  profileAvatarPopupTrigger,
  profileAvatarSubmitButton,
  profilePopup,
  profilePopupTrigger,
  profileTitle,
  profileDesc,
  profileForm,
  profileNameInput,
  profileDescInput,
  profileSubmitButton,
  cardPopup,
  cardPopupTrigger,
  cardPopupForm,
  cardNameInput,
  cardLinkInput,
  cardSubmitButton,
  crossButtons,
  cardsContainer,
} from './elements';
import {openPopup, closePopup} from './modal.js';
import {enableValidation} from "./validate";
import {createCard} from "./card";
import {fetchUser, fetchCards, updateUser, addCard, updateAvatar} from './api';

Promise.all([fetchUser(), fetchCards()])
  .then(([user, cards]) => {
    if (user) {
      const avatarEl = document.querySelector('.profile__avatar');
      const nameEl = document.querySelector('.profile__title-text');
      const aboutEl = document.querySelector('.profile__subtitle');

      avatarEl.src = user.avatar;
      nameEl.textContent = user.name;
      aboutEl.textContent = user.about;
    }
    if (cards) {
      cards.forEach(function (item) {
        const card = createCard(item._id, item.name, item.link, item.likes.length)
      
        cardsContainer.append(card)
      })
    }
  })
  .catch(error => {
    console.error(error);
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
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      removeLoading();
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
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      removeLoading();
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
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      removeLoading();
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
