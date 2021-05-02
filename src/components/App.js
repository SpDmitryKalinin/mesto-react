import React, { Component, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: {},
            currentUser: ''
        }
    }

    closePopup(stateValue){
        this.setState({[stateValue]: false});
    }
    setCardInfo(card){
        this.setState({selectedCard: card});
    }


    componentDidMount(){
        if(this.state.currentUser === ''){
            api.getProfileInfo().then(res =>{
                this.setState({currentUser: res._id});
            })
            .catch(res =>{
                console.log(res);
            })
        };
    }

    render(){
        return(
        <div className="page">
            <Header/>
            <Main 
                onCardClick = {this.setCardInfo.bind(this)} 
                onEditProfile ={() => this.setState({isEditProfilePopupOpen: true})}
                onAddPlace ={() => this.setState({isAddPlacePopupOpen: true})}
                onEditAvatar ={() => this.setState({isEditAvatarPopupOpen: true})}/>
            <Footer/>
            <PopupWithForm 
                onClose = {() => this.closePopup('isAddPlacePopupOpen')} 
                isOpen = {this.state.isAddPlacePopupOpen} 
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
                onClose = {() => this.closePopup('isEditProfilePopupOpen')}
                isOpen = {this.state.isEditProfilePopupOpen}  
                name="edit" 
                title="Редактировать профиль">
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
                onClose = {() => this.closePopup('isEditAvatarPopupOpen')} 
                isOpen = {this.state.isEditAvatarPopupOpen} 
                name="edit-avatar" 
                title="Редактировать аватар">
                <label>
                    <input type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
            </PopupWithForm>

            <PopupWithForm 
                name="confirm" 
                title="Вы уверены?" 
                isOpen = {false}/>
            <ImagePopup 
                card = {this.state.selectedCard} 
                onClose = {() => this.closePopup('selectedCard')}/>
        </div>);
    }
}



export default App;
