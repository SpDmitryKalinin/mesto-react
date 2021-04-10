import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
function App() {
    const [isEditProfilePopupOpen, handleEditProfileClick] = useState(false);
    const [isAddPlacePopupOpen, handleAddPlaceClick] = useState(false);
    const [isEditAvatarPopupOpen, handleEditAvatarClick] = useState(false);
    const [selectedCard, handleCardClick] = useState(false);
  return (
    <div className="page">
        <Header/>
        <Main onCardClick = {handleCardClick} onEditProfile ={() => handleEditProfileClick(!isEditProfilePopupOpen)} onAddPlace ={() => handleAddPlaceClick(!isAddPlacePopupOpen)} onEditAvatar ={() => handleEditAvatarClick(!isEditAvatarPopupOpen)}/>
        <Footer/>
        <PopupWithForm isClose = {() => closeAllPopups(handleAddPlaceClick)} isOpen = {isAddPlacePopupOpen ? 'modal-window_is-open' : ''} name="add" title="Новое место" children={
            <>
            <label><input name="place" placeholder = "Название" className="modal-window__item modal-window__place" type="text" required minLength="2" maxLength="30"/><span className="modal-window__type-error">hhhh</span></label>
            <label><input type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/><span className="modal-window__type-error">Вы пропустили это поле</span></label>
            </>
        }/>

        <PopupWithForm isClose = {() => closeAllPopups(handleEditProfileClick)} isOpen = {isEditProfilePopupOpen ? 'modal-window_is-open' : ''}  name="edit" title="Редактировать профиль" children={
            <>
                <label>
                    <input name="name" placeholder = "Имя" className="modal-window__item modal-window__name" type="text" required minLength="2" maxLength="40"/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <label><input name="emloyment" placeholder = "Род деятельности" className="modal-window__item modal-window__employment" type="text" minLength="2" maxLength="200" required/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
            </>
        }/>

        <PopupWithForm isClose = {() => closeAllPopups(handleEditAvatarClick)} isOpen = {isEditAvatarPopupOpen ? 'modal-window_is-open' : ''} name="edit-avatar" title="Редактировать аватар" children={
            <label><input type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/><span className="modal-window__type-error">Вы пропустили это поле</span></label>
        }/>

        <PopupWithForm name="confirm" title="Вы уверены?" isOpen = {false}/>

        <ImagePopup card = {selectedCard} isClose = {() => closeAllPopups(handleCardClick)}/>
    </div>
    );
    function closeAllPopups(handler){
        handler(false);
    }
}



export default App;
