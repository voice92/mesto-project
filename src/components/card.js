import {openImagePopup} from "./modal";

const cardTemplate = document.querySelector('#element-template')

function deleteElement(event) {
  event.target.closest('.element').remove()
}

function toggleLike(event) {
  event.target.classList.toggle('element__button-like_liked')
}

export function createCard(name, link) {
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
