import Header from "./header/Header.js";
import Main from "./main/Main.js";
import Footer from "./footer/Footer.js";
import api from "../utils/api.js";
import { useEffect, useState } from "react";
import ImagePopup from "./main/components/popup/imagePopup/ImagePopup.js";
import EditProfile from "./main/components/popup/editProfile/EditProfile.js";
import EditAvatar from "./main/components/popup/editAvatar/EditAvatar.js";
import AddPlacePopup from "./main/components/popup/NewCard/NewCard.js";
import ConfirmationPopup from "./main/components/popup/removeCard/RemoveCard.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        console.log('Dados do usuário obtidos:', data); // Verifica os dados retornados
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log('Erro ao obter dados do usuário:', error);
      });
  
    api
      .getInitialCards()
      .then(setCards)
      .catch((error) => console.log('Erro ao obter dados dos cards:', error));
  }, []);

    const handleUpdateUser = (userData) => {
      if (!userData.name || !userData.about) {
        console.log('Erro: nome ou descrição ausentes');
        return; // Não envia a requisição se os dados estiverem incompletos
      }
    
      api.editUserInfo(userData)
        .then((userInfo) => {
          setCurrentUser(userInfo); // Atualiza os dados do usuário
          closeAllPopups(); // Fecha o popup
        })
        .catch((error) => {
          console.log('Erro ao atualizar o perfil:', error);
        });
    };

    const handleUpdateAvatar = (data) => {
      (async () => {
        await api
          .editAvatar(data)
          .then((newData) => {
            setCurrentUser(newData); // Atualiza o avatar do usuário localmente
            closeAllPopups(); // Fecha o pop-up após a atualização
          })
          .catch((error) => console.error("Erro ao atualizar o avatar:", error));
      })();
    };
  

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log("Estado atual do like antes da API:", isLiked);
  
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        console.log("Novo card atualizado:", newCard); // Confirma o card atualizado
  
        // Atualiza o estado de cards, substituindo apenas o card que mudou
        setCards((prevCards) => {
          if (prevCards.length === 0) {
            console.log("Erro: Nenhum card encontrado no estado atual.");
            return prevCards; // Retorna o estado anterior sem mudanças
          }
          
          // Retorna uma nova lista de cards, substituindo apenas o card atualizado
          const updatedCards = prevCards.map((c) => 
            c._id === card._id ? newCard : c
          );
  
          console.log("Novo estado de cards após atualização:", updatedCards);
          return updatedCards;
        });
      })
      .catch((error) => console.log("Erro ao atualizar o like:", error));
  };
  

  function handleDeleteClick(card) {
    setCardToDelete(card); // Define o card a ser excluído
    setIsConfirmationPopupOpen(true); // Abre o popup de confirmação
  }

  // Função chamada após confirmação
  function confirmDelete() {
    if (!cardToDelete) return; // Verificação de segurança para evitar chamadas desnecessárias
  
    api
      .removeCard(cardToDelete._id) // Chama a API para deletar o card
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id)); // Remove o card do estado
  
        setCardToDelete(null); // Limpa o card selecionado
        setIsConfirmationPopupOpen(false); // Fecha o popup de confirmação
      })
      .catch((error) => console.log("Erro ao deletar o card:", error));
  }

const handleAddPlaceSubmit = (newCardData) => {
  api.addCard(newCardData)
    .then((newCard) => {
      setCards((prevCards) => [newCard, ...prevCards]);
      closeAllPopups();
    })
    .catch((error) => console.error('Erro ao adicionar o cartão:', error));
};


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
}

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
}

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar}}>
      <Header />
      <Main 
      cards={cards}
      onEditAvatarClick={handleEditAvatarClick} 
      isEditAvatarPopupOpen={isEditAvatarPopupOpen} 
      onEditProfileClick={handleEditProfileClick} 
      isEditProfilePopupOpen={isEditProfilePopupOpen} 
      onAddPlaceClick={handleAddPlaceClick} 
      isAddPlacePopupOpen={isAddPlacePopupOpen} 
      closeAllPopups={closeAllPopups}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleDeleteClick}
      />
      <EditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={() => setIsConfirmationPopupOpen(false)}
        onConfirmationSubmit={confirmDelete}
      />
      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      )}
      <Footer />
      </CurrentUserContext.Provider>
  </div>
  );

}

export default App;
