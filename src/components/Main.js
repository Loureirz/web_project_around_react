import profilePic from "../image/image.jpg";
import buttonPic from "../image/vector.svg";
import buttonAddPic from "../image/vectoradd.svg";
import close from "../image/close.svg";
import trash from "../image/Trash.svg";
import PopupWithForm from "./PopupWithForm";

export default function Main({onEditAvatarClick, isEditAvatarPopupOpen, onEditProfileClick, isEditProfilePopupOpen, onAddPlaceClick, isAddPlacePopupOpen, closeAllPopups, onCardClick}) {

    return (
        <main className="main">
      <section className="profile">
        <button type="button" className="profile__image-edit" onClick={onEditAvatarClick}>
          <img src={profilePic} alt="Foto Profile" className="profile__image"/>
        </button>
        <div className="profile__info">
          <h4 className="profile__info-name">Jacques Cousteau</h4>
          <button className="profile__info-button" onClick={onEditProfileClick}>
            <img src={buttonPic} alt="Button Image" className="profile__info-button-image"/>
          </button>
          <p className="profile__info-text">Explorador</p>


        </div>
        <button className="profile__button" onClick={onAddPlaceClick}>
          <img src={buttonAddPic} alt="Button Add Image" className="profile__button-add"/>
        </button>
        

        <div className="popup popup_image">
          <div className="overlay"></div>
          <div className="popup__zoom">
            <button className="popup__close"><img src={close} alt="icone de fechar" className="popup__close-img"/></button>
            <img src="#" alt="#" className="popup__zoom-image"/>
            <p className="popup__zoom-text"></p>
         </div>
        </div>

        <div className="popup popup-confirm" id="popup-confirm">
          <div className="overlay"></div>
          <div className="popup-confirm__element" >
            <button className="popup__close"><img src={close} alt="icone de fechar" className="popup__close-img"/></button>
            <h2 className="popup-confirm__text">Tem certeza?</h2>
            <button type="submit" className="popup-confirm__btn" id="popup-confirm-btn">Sim</button>
          </div>
        </div>
      </section>
      <div className="elements">
        <template id="template">
          <div className="elements__card">
            <button type="button" className="elements__delete-button">
              <img className="elements__delete-icon" src={trash} alt="delete button icon" />
            </button>
            <img className="elements__card-image" src="#" alt="" />
            <div className="elements__wrapper-text-and-like-button">
              <p className="elements__card-name"></p>
              <div className="elements__like">
              <button type="button" className="elements__like-button">
              </button>
              <p className="elements__like-counter"></p>
              </div>
            </div>
          </div>
        </template>
      </div>

      <PopupWithForm name="user" title="Editar Perfil" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
              <input name="name" type="text" className="form__input-name"  minLength="2"
                maxLength="40" placeholder="Nome" required/>
              <p className="form__input-name-error"></p>
              <input name="about" type="text" className="form__input-job"   minLength="2"
                maxLength="200" placeholder="Sobre" required/>
              <p className="form__input-job-error"></p>
              <button type="submit"  className="form__submit">Salvarr</button>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Alterar a Foto de Perfil" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
              <input
                className="popup__avatar-input"
                id="avatar"
                placeholder="Link da Imagem"
                type="url"
                name="image"
                required
              />
              <p className="git"></p>
              <button className="popup__avatar-submit" type="submit">Salvar</button>
      </PopupWithForm>

      <PopupWithForm name="card" title="Novo Local" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
              <input type="text" className="formcard__input-title" name="name"  minLength="2"
                maxLength="30" placeholder="Título" required/>
              <p className="formcard__input-title-error"></p>
              <input id="link-image" type="url" className="formcard__input-link" name="link" placeholder="Link da Imagem"
                required/>
              <p className="formcard__input-link-error"></p>
              <button type="submit" value="Criar" className="formcard__submit">Criar</button>
      </PopupWithForm>
    </main>
    )
}