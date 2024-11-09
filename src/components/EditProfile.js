import { useState, useContext } from 'react'; 
import CurrentUserContext from '../contexts/CurrentUserContext'; 

export default function EditProfile() {
  const currentUser = useContext(CurrentUserContext); // Obtém o objeto de usuário atual

  const [name, setName] = useState(""); // Adicione variável de estado para nome
  const [description, setDescription] = useState(""); // Adicione variável de estado para descrição

  const handleNameChange = (event) => {
    setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Atualiza a descrição (description) quando a entrada for alterada
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="userName"
          placeholder="Nome"
          required
          type="text"
          value={name} // Bind name to input
          onChange={handleNameChange} // Add onChange handler
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Sobre mim"
          required
          type="text"
          value={description} // Bind description to input
          onChange={handleDescriptionChange} // Add onChange handler
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Save
      </button>
    </form>
  );
}