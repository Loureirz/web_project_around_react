import { useState, useEffect } from 'react';
import PopupWithForm from '../popup/Popup';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
    setName('');
    setLink('');
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Novo Local"
      name="card" // ajuste este nome para corresponder ao seletor de configuração correto em configFormValidade
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="formcard__input-title"
        id="title-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        name="title"
        placeholder="Título"
        minLength={2}
        maxLength={30}
        required
      />
      <span id="title-input-error" className="formcard__input-title-error"></span>
      
      <input
        className="formcard__input-link"
        id="url-input"
        value={link}
        onChange={(event) => setLink(event.target.value)}
        type="url"
        name="url"
        placeholder="Link da imagem"
        required
      />
      <span id="url-input-error" className="formcard__input-link-error"></span>
      
      <button
        className="formcard__submit"
        type="submit"
        name="card"
      >
        Criar
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
