import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    function closePopup(handler){
        handler(false);
        console.log('???');
    }
  return (
    <div className="page">
        <Header/>
        <Main onCardClick = {setSelectedCard} 
        onEditProfile ={() => setIsEditProfilePopupOpen(true)} 
        onAddPlace ={() => setisAddPlacePopupOpen(true)} 
        onEditAvatar ={() => setisEditAvatarPopupOpen(true)}/>
        <Footer/>
        <PopupWithForm 
            onClose = {() => closePopup(setisAddPlacePopupOpen)} 
            isOpen = {isAddPlacePopupOpen} 
            name="add" 
            title="Новое место"
        >
            <label>
                <input name="place" placeholder = "Название" className="modal-window__item modal-window__place" type="text" required minLength="2" maxLength="30"/>
                <span className="modal-window__type-error">Вы пропустили это поле</span>
            </label>
            <label>
                <input type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/>
                <span className="modal-window__type-error">Вы пропустили это поле</span>
            </label>
        </PopupWithForm>

        <PopupWithForm 
            onClose = {() => closePopup(setIsEditProfilePopupOpen)} 
            isOpen = {isEditProfilePopupOpen}  
            name="edit" 
            title="Редактировать профиль"
        >
            <label>
                <input name="name" placeholder = "Имя" className="modal-window__item modal-window__name" type="text" required minLength="2" maxLength="40"/>
                <span className="modal-window__type-error">Вы пропустили это поле</span>
            </label>
            <label>
                <input name="emloyment" placeholder = "Род деятельности" className="modal-window__item modal-window__employment" type="text" minLength="2" maxLength="200" required/>
                <span className="modal-window__type-error">Вы пропустили это поле</span>
            </label>
        </PopupWithForm>

        <PopupWithForm 
            onClose = {() => closePopup(setisEditAvatarPopupOpen)} 
            isOpen = {isEditAvatarPopupOpen} 
            name="edit-avatar" 
            title="Редактировать аватар"
        >
            <label>
                <input type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/>
                <span className="modal-window__type-error">Вы пропустили это поле</span>
            </label>
        </PopupWithForm>

        <PopupWithForm 
            name="confirm" 
            title="Вы уверены?" 
            isOpen = {false}
        />
        <ImagePopup 
            card = {selectedCard} 
            onClose = {() => closePopup(setSelectedCard)}
        />
    </div>
    );
}



export default App;
