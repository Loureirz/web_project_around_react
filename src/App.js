import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";
import api from "./utils/api.js";
import { useEffect, useState } from "react";
import ImagePopup from "./components/ImagePopup";
import { CurrentUserContext } from "./contexts/CurrentUserContext.js";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then(setCurrentUser)
      .catch((error) => console.log('Erro ao obter dados do usuário:', error));

        api
        .getInitialCards()
        .then(setCards)
        .catch((error) => console.log('Erro ao obter dados do usuário:', error));
    }, []);

  /*useEffect(() => {
    api
      .getInitialCards()
      .then((fetchedCards) => {
        setCards(fetchedCards);
      })
      .catch((error) => console.log('Erro ao obter os cards:', error));
  }, []);*/

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
  

const handleCardDelete = (card) => {
  api
    .removeCard(card._id) // Método que faz a requisição DELETE para deletar o card
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id)); // Remove o card do estado
    })
    .catch((error) => console.log("Erro ao deletar o card:", error));
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
      <CurrentUserContext.Provider value={currentUser}>
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
      onCardDelete={handleCardDelete}
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
