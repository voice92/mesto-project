import {openImagePopup} from "./modal";
import {deleteCard, putLike, deleteLike} from './api';

const cardTemplate = document.querySelector('#element-template')

function deleteElement(event) {
  const id = event.target.dataset.id;
  
  deleteCard(id)
    .then(() => {
      event.target.closest('.element').remove()
    })
    .catch(error => {
      console.log(error)
    })
}

function toggleLike(event) {
  const id = event.target.dataset.id;

  if (isLiked(id)) {
    deleteLike(id)
      .then(card => {
        removeLike(id, card.likes.length);
      })
      .catch(error => {
        console.log(error)
      })
  } else {
    putLike(id)
      .then(card => {
        addLike(id, card.likes.length);
      })
      .catch(error => {
        console.log(error)
      })
  }
}

function isLiked(id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  const elementLikeButton = card.querySelector('.element__button-like');
  return elementLikeButton.classList.contains('element__button-like_liked');
}

function addLike(id, likes) {
  const card = document.querySelector(`[data-id="${id}"]`);
  const elementLikeCount = card.querySelector('.element__likes');
  const elementLikeButton = card.querySelector('.element__button-like');

  elementLikeCount.textContent = likes;
  elementLikeButton.classList.add('element__button-like_liked');
}

function removeLike(id, likes) {
  const card = document.querySelector(`[data-id="${id}"]`);
  const elementLikeCount = card.querySelector('.element__likes');
  const elementLikeButton = card.querySelector('.element__button-like');

  elementLikeCount.textContent = likes;
  elementLikeButton.classList.remove('element__button-like_liked');
}

export function createCard(myId, data) {
  const element = cardTemplate.content.cloneNode(true)
  const elementTitle = element.querySelector('.element__title')
  const elementImage = element.querySelector('.element__image')
  const elementDeleteButton = element.querySelector('.element__button-trash')
  const elementLikeButton = element.querySelector('.element__button-like')
  const elementLikeCount = element.querySelector('.element__likes')

  element.firstElementChild.dataset.id = data._id
  elementTitle.textContent = data.name
  elementImage.src = data.link
  elementImage.alt = data.name
  elementLikeButton.dataset.id = data._id
  elementLikeCount.textContent = data.likes.length
  elementDeleteButton.dataset.id = data._id

  if (data.likes.some(like => like._id === myId)) {
    elementLikeButton.classList.add('element__button-like_liked');
  }

  if (myId === data.owner._id) {
    elementDeleteButton.addEventListener('click', deleteElement)
  } else {
    elementDeleteButton.style.display = 'none'
  }
  
  elementLikeButton.addEventListener('click', toggleLike)
  elementImage.addEventListener('click', openImagePopup)

  return element
}
