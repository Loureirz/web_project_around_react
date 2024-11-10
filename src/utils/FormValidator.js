export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  // Exibe mensagem de erro
  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClassVisible);
  }

  // Oculta mensagem de erro
  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClassVisible);
    errorElement.textContent = '';
  }

  // Verifica a validade do input e mostra ou oculta o erro conforme necessário
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // Verifica se algum input está inválido
  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  // Atualiza o estado do botão de submit com base na validade dos inputs
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  // Adiciona ouvintes de eventos para cada input do formulário
  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Ativa a validação
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
    this._toggleButtonState();  // Estado inicial do botão
  }

  // Reseta a validação para remover erros e ajustar o estado do botão
  resetValidation() {
    this._inputList.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }
}
