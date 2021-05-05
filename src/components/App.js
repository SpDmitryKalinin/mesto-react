import React, { Component, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {currentUserContext} from './../contexts/CurrentUserContext.js';

class App extends React.Component{
    static contextType = currentUserContext;
    constructor(props){
        super(props);
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: {},
            currentUser: '',
            cards: []
        }
    }
    
    closePopup(stateValue){
        this.setState({[stateValue]: false});
    }
    setCardInfo(card){
        this.setState({selectedCard: card});
    }

    componentDidMount(){
        this.handleInitProfile();
        this.handleInitCards();
    }

    handleUpdateUser(name, about){
        Api.patchProfileInfo(name, about).then(res => {
            this.setState({currentUser: res});
        })
        .catch(res =>{
            console.log(res);
        })
    }

    handleUpdateAvatar(inputValue){
        Api.patchProfileAvatar(inputValue).then(res =>{
            this.setState({currentUser: res});
        })
        .catch(res =>{
            console.log(res);
        })
    }

    handleInitCards(){
        Api.getCards().then(res =>{
            this.setState({cards: res});
        })
        .catch(res =>{
            console.log(res)
        });
    }

    handleInitProfile(){
        if(this.state.currentUser === ''){
            Api.getProfileInfo().then(res =>{
                this.setState({currentUser: res});
            })
            .catch(res =>{
                console.log(res);
            })
        };
    }

    handleCardLike(card){
        const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
        if(isLiked){
            Api.deleteLike(card._id).then(()=>{
                this.handleInitCards();
            })
            .catch(res =>{
                console.log(res);
            })
        }
        else{
            Api.putLike(card._id).then(()=>{
                this.handleInitCards();
            })
            .catch(res =>{
                console.log(res);
            }) 
        }
    }

    handleCardDelete(card){
        Api.deleteCard(card._id).then(()=>{
            this.handleInitCards();
        })
        .catch(res =>{
            console.log(res);
        }) 
    }

    handleAddCard(name, link){
        Api.postCards(name,link).then(res =>{
            this.setState(state =>{
                return{
                    cards: [res, ...state.cards]
                }

            })
        })
        .catch(res =>{
            console.log(res);
        })
    }

    render(){
        return(
        <currentUserContext.Provider value={this.state.currentUser}>
            <div className="page">
                <Header/>
                <Main 
                    onCardClick = {this.setCardInfo.bind(this)} 
                    onEditProfile ={() => this.setState({isEditProfilePopupOpen: true})}
                    onAddPlace ={() => this.setState({isAddPlacePopupOpen: true})}
                    onEditAvatar ={() => this.setState({isEditAvatarPopupOpen: true})}
                    cards ={this.state.cards}
                    onCardLike = {this.handleCardLike.bind(this)}
                    onCardDelete = {this.handleCardDelete.bind(this)}
                    initCards ={this.handleInitCards.bind(this)}/>
                <Footer/>

                <AddPlacePopup onAddPlace ={this.handleAddCard.bind(this)} onClose = {() => this.closePopup('isAddPlacePopupOpen')} isOpen = {this.state.isAddPlacePopupOpen}/>

                <EditProfilePopup onClose = {() => this.closePopup('isEditProfilePopupOpen')} isOpen = {this.state.isEditProfilePopupOpen} onUpdateUser ={this.handleUpdateUser.bind(this)}/>

                <EditAvatarPopup onUpdateAvatar = {this.handleUpdateAvatar.bind(this)} onClose = {() => this.closePopup('isEditAvatarPopupOpen')} isOpen = {this.state.isEditAvatarPopupOpen}/> 

                <PopupWithForm 
                    name="confirm" 
                    title="Вы уверены?" 
                    isOpen = {false}/>
                <ImagePopup 
                    card = {this.state.selectedCard} 
                    onClose = {() => this.closePopup('selectedCard')}/>
            </div>
        </currentUserContext.Provider>
        );
    }
}



export default App;
