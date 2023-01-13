function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(options.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(options.errorClass)
}

function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(options.inputErrorClass)
  errorElement.classList.remove(options.errorClass)
  errorElement.textContent = ''
}

function isValid(formElement, inputElement, options) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options)
  } else {
    hideInputError(formElement, inputElement, options)
  }
}

function setEventListeners(formElement, options) {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector))
  const buttonElement = formElement.querySelector(options.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, options)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, options)

      toggleButtonState(inputList, buttonElement, options)
    })
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(options.inactiveButtonClass)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(options.inactiveButtonClass)
  }
}

export function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector))

  formList.forEach((formElement) => {
    setEventListeners(formElement, options)
  })
}
