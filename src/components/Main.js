import profilePic from "../image/image.jpg";
import buttonPic from "../image/vector.svg";
import buttonAddPic from "../image/vectoradd.svg";
import close from "../image/close.svg";
import trash from "../image/Trash.svg";

export default function Main() {

    function handleEditAvatarClick() {
        document.querySelector(".profile__image-edit").addEventListener("click", () => {
            console.log("oi");
            const avatarEditPic = document.querySelector("#popup-avatar");

            avatarEditPic.classList.add("popup-opened");
        })
    }

    function handleEditProfileClick() {
      document.querySelector(".profile__info-button").addEventListener("click", () => {
        const profileEdit = document.querySelector("#popup-user");

        profileEdit.classList.add("popup-opened");
      })
    }

    function handleAddPlaceClick() {
      document.querySelector(".profile__button").addEventListener("click", () => {
        const addCard = document.querySelector("#popup-card");

        addCard.classList.add("popup-opened");
      })

    }

    return (
        <main className="main">
      <section className="profile">
        <button type="button" className="profile__image-edit" onClick={handleEditAvatarClick}>
          <img src={profilePic} alt="Foto Profile" className="profile__image"/>
        </button>
        <div className="profile__info">
          <h4 className="profile__info-name">Jacques Cousteau</h4>
          <button className="profile__info-button" onClick={handleEditProfileClick}>
            <img src={buttonPic} alt="Button Image" className="profile__info-button-image"/>
          </button>
          <p className="profile__info-text">Explorador</p>


        </div>
        <button className="profile__button" onClick={handleAddPlaceClick}>
          <img src={buttonAddPic} alt="Button Add Image" className="profile__button-add"/>
        </button>

        <div className="popup form" id="popup-user">
          <div className="overlay"></div>
          <div className="popup__container">
            <button className="popup__close"><img src={close} alt="icone de fechar"
                className="popup__close-img"/></button>
            <h2 className="form__title">Editar Perfil</h2>
            <form className="form__fieldset">
              <input name="name" type="text" className="form__input-name"  minlength="2"
                maxlength="40" required/>
              <p className="form__input-name-error"></p>
              <input name="about" type="text" className="form__input-job"   minlength="2"
                maxlength="200" required/>
              <p className="form__input-job-error"></p>
              <button type="submit"  className="form__submit">Salvar</button>
            </form>
          </div>
        </div>

        <div className="popup" id="popup-avatar">
          <div className="overlay"></div>
          <div className="popup__avatar">
            <button className="popup__close"><img src={close} alt="icone de fechar" className="popup__close-img"/></button>
            <h2 className="popup__avatar-title">Alterar a Foto do Perfil</h2>
            <form className="popup__avatar-form" novalidate>
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
            </form>
          </div>
        </div>

        <div className="popup popup_add" id="popup-card">
          <div className="overlay"></div>
          <div className="popupcard formcard">
            <button className="popup__close"><img src={close} alt="icone de fechar" className="popup__close-img"/></button>
            <h2 className="formcard__title">Novo Local</h2>
            <form className="formcard__fieldset" novalidate>
              <input type="text" className="formcard__input-title" name="name"  minlength="2"
                maxlength="30" required/>
              <p className="formcard__input-title-error"></p>
              <input id="link-image" type="url" className="formcard__input-link" name="link"
                required/>
              <p className="formcard__input-link-error"></p>
              <button type="submit" value="Criar" className="formcard__submit">Criar</button>
            </form>
          </div>
        </div>

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

    </main>
    )
}