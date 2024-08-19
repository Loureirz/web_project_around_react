import { useState, useEffect } from "react";
import profilePic from "../image/image.jpg";
import buttonPic from "../image/vector.svg";
import buttonAddPic from "../image/vectoradd.svg";
import close from "../image/close.svg";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import Card from "./Card";

export default function Main({onEditAvatarClick, isEditAvatarPopupOpen, onEditProfileClick, isEditProfilePopupOpen, onAddPlaceClick, isAddPlacePopupOpen, closeAllPopups, onCardClick}) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then(data => {
        setUserName(data.name)
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
      })
      .catch((error) => console.log('Erro ao obter dados do usuário:', error));

      api
      .getInitialCards()
      .then(setCards)
      .catch((error) => console.log('Erro ao obter dados do usuário:', error));
  }, []);

  return (
        <main className="main">
      <section className="profile">
        <button type="button" className="profile__image-edit" onClick={onEditAvatarClick}>
          <img src={userAvatar} alt="Foto Profile" className="profile__image"/>
        </button>
        <div className="profile__info">
          <h4 className="profile__info-name">{userName}</h4>
          <button className="profile__info-button" onClick={onEditProfileClick}>
            <img src={buttonPic} alt="Button Image" className="profile__info-button-image"/>
          </button>
          <p className="profile__info-text">{userDescription}</p>


        </div>
        <button className="profile__button" onClick={onAddPlaceClick}>
          <img src={buttonAddPic} alt="Button Add Image" className="profile__button-add"/>
        </button>
        

        

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
      {cards.map(card => (
        <Card key={card._id} card={card} onCardClick={onCardClick} />
      ))}
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