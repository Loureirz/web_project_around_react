import { useState, useEffect } from 'react';
import PopupWithForm from '../Popup';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  // Limpa os campos de nome e link quando o pop-up é fechado
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  // Função para submeter o formulário e chamar onAddPlaceSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({
      name,
      link,
    });
    setName('');
    setLink('');
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Novo Local"
      name="popup-add"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="formcard__input-title"
          id="title-input"
          value={name}
          onChange={(event) => setName(event.target.value)}  // Atualiza o estado name
          type="text"
          name="title"
          placeholder="Título"
          minLength={2}
          maxLength={30}
          required
        />
        <span className="formcard__input-title-error"></span>
        
        <input
          className="formcard__input-link"
          id="url-input"
          value={link}
          onChange={(event) => setLink(event.target.value)}  // Atualiza o estado link
          type="url"
          name="url"
          placeholder="Link da imagem"
          required
        />
        <span className="formcard__input-link-error"></span>
        <button className="formcard__submit" type="submit">
        Criar
      </button>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
