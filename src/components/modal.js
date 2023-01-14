const imagePopup = document.querySelector('#img-popup')
const popupImgElement = document.querySelector('.popup__img')
const popupTitleElement = document.querySelector('.popup__img-text')

const POPUP_ACTIVE_CLASS_NAME = 'popup_opened'

function onEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector(`.${POPUP_ACTIVE_CLASS_NAME}`)
    if (openedPopup) {
      closePopup(openedPopup)
    } 
  }
}

function onOverlayClick(event) {
  const overlayIsClicked = event.target.classList.contains(POPUP_ACTIVE_CLASS_NAME)

  if (overlayIsClicked) {
    closePopup(event.target)
  }
}

export function openPopup(popup) {
  popup.classList.add(POPUP_ACTIVE_CLASS_NAME)

  document.addEventListener('keydown', onEscape)
  document.addEventListener('click', onOverlayClick)
}

export function closePopup(popup) {
  popup.classList.remove(POPUP_ACTIVE_CLASS_NAME)

  document.removeEventListener('keydown', onEscape)
  document.removeEventListener('click', onOverlayClick)
}

export function openImagePopup(event) {
  const targetElement = event.target.closest('.element')
  popupImgElement.src = event.target.src
  popupImgElement.alt = event.target.alt

  popupTitleElement.textContent = targetElement.querySelector('.element__title').textContent
  openPopup(imagePopup)
}
