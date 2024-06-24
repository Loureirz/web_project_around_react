import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack, popupForm) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._formElement = document.querySelector(popupForm);
  }

  _getInputValues() {
    const inputs = Array.from(this._formElement.querySelectorAll("input"));

    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  _loading(isLoading) {
    if(isLoading) {
      this._submitCallBack.textContent = "Salvando...";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const valores = this._getInputValues();
      this._submitCallBack(valores);
      this._loading(true);
      this.close();
      this.reset();
    });
  }

  close() {
    super.close();
  }

  reset() {
    this._formElement.reset();
  }
}
