import close from "../image/close.svg";

export default function PopupWithForm({ name, title, children, isOpen }) {

  const cssIsOpened = isOpen ? 'popup-opened' : '';

  return (
    <div className={`popup popup_${name} ${cssIsOpened}`}>
          <div className="overlay"></div>
          <div className="popup__container">
            <button className="popup__close"><img src={close} alt="icone de fechar"
                className="popup__close-img"/></button>
            <h2 className="form__title">{title}</h2>
            <form className="form__fieldset" noValidate name={name}>
              {children}
            </form>
          </div>
        </div>
  )
}