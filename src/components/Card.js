import React from 'react';
import trash from "../image/Trash.svg";

function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
      }


    return (
            <div className="elements__card" key={card._id}>
              <button type="button" className="elements__delete-button">
                <img className="elements__delete-icon" src={trash} alt="delete button icon"/>
              </button>
              <img className="elements__card-image" src={card.link} alt="" onClick={handleClick}/>
              <div className="elements__wrapper-text-and-like-button">
                <p className="elements__card-name">{card.name}</p>
                <div className="elements__like">
                  <button type="button" className="elements__like-button"></button>
                  <p className="elements__like-counter">{card.likes.length}</p>
                </div>
              </div>
            </div>
    );
}

export default Card;