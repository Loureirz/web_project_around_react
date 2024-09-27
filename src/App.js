import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/footer.js";
import { useEffect, useState } from "react";
import ImagePopup from "./components/ImagePopup";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

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
      <Header />
      <Main 
      onEditAvatarClick={handleEditAvatarClick} 
      isEditAvatarPopupOpen={isEditAvatarPopupOpen} 
      onEditProfileClick={handleEditProfileClick} 
      isEditProfilePopupOpen={isEditProfilePopupOpen} 
      onAddPlaceClick={handleAddPlaceClick} 
      isAddPlacePopupOpen={isAddPlacePopupOpen} 
      closeAllPopups={closeAllPopups}
      onCardClick={handleCardClick}
      />
      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      )}
      <Footer />
  </div>
  );

}

export default App;
