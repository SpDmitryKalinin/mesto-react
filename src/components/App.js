import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
function App() {
    const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
    const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
    const [selectedCard, setCardClick] = useState({});
    function closePopup(handler){
        handler(false);
    }
  return (
    <div className="page">
        <Header/>
        <Main onCardClick = {setCardClick} 
        onEditProfile ={() => setEditProfileClick(!isEditProfilePopupOpen)} 
        onAddPlace ={() => setAddPlaceClick(!isAddPlacePopupOpen)} 
        onEditAvatar ={() => setEditAvatarClick(!isEditAvatarPopupOpen)}/>
        <Footer/>
        <PopupWithForm onClose = {() => closePopup(setAddPlaceClick)} isOpen = {isAddPlacePopupOpen ? 'modal-window_is-open' : ''} name="add" title="Новое место" children={
            <>
                <label><input name="place" placeholder = "Название" className="modal-window__item modal-window__place" type="text" required minLength="2" maxLength="30"/><span className="modal-window__type-error">hhhh</span></label>
                <label><input type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/><span className="modal-window__type-error">Вы пропустили это поле</span></label>
            </>
        }/>

        <PopupWithForm onClose = {() => closePopup(setEditProfileClick)} isOpen = {isEditProfilePopupOpen ? 'modal-window_is-open' : ''}  name="edit" title="Редактировать профиль" children={
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

        <PopupWithForm onClose = {() => closePopup(setEditAvatarClick)} isOpen = {isEditAvatarPopupOpen ? 'modal-window_is-open' : ''} name="edit-avatar" title="Редактировать аватар" children={
            <label><input type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/><span className="modal-window__type-error">Вы пропустили это поле</span></label>
        }/>

        <PopupWithForm name="confirm" title="Вы уверены?" isOpen = {false}/>

        <ImagePopup card = {selectedCard} onClose = {() => closePopup(setCardClick)}/>
    </div>
    );
}



export default App;
