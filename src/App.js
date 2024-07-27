import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useState } from "react";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

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
  }

  return (
    <div className="page">
      <Header />
      <Main onEditAvatarClick={handleEditAvatarClick} isEditAvatarPopupOpen={isEditAvatarPopupOpen} onEditProfileClick={handleEditProfileClick} isEditProfilePopupOpen={isEditProfilePopupOpen} onAddPlaceClick={handleAddPlaceClick} isAddPlacePopupOpen={isAddPlacePopupOpen} closeAllPopups={closeAllPopups}/>
      <Footer />
  </div>
  );

}

export default App;
