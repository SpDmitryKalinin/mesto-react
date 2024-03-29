import React, { Component, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
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
        api.patchProfileInfo(name, about).then(res => {
            this.setState({currentUser: res});
            this.closePopup('isEditProfilePopupOpen')
        })
        .catch(res =>{
            console.log(res);
        })
    }

    handleUpdateAvatar(inputValue){
        api.patchProfileAvatar(inputValue).then(res =>{
            this.setState({currentUser: res});
            this.closePopup('isEditAvatarPopupOpen');
        })
        .catch(res =>{
            console.log(res);
        })
    }

    handleInitCards(){
        api.getCards().then(res =>{
            this.setState({cards: res});
        })
        .catch(res =>{
            console.log(res)
        });
    }

    handleInitProfile(){
        if(this.state.currentUser === ''){
            api.getProfileInfo().then(res =>{
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
            api.deleteLike(card._id).then(res=>{
                this.setState(state =>{
                    return{
                        cards: state.cards.map((item)=> item._id === card._id ? res : item)
                    }
                })
            })
        }
        else{
            api.putLike(card._id).then(res=>{
                this.setState(state =>{
                    return{
                        cards: state.cards.map((item)=> item._id === card._id ? res : item)
                    }
                })
            })
        }
    }

    handleCardDelete(card){
        api.deleteCard(card._id).then(()=>{
            this.setState(state =>{
                return{
                    cards: state.cards.filter((item)=>{
                        if(item._id!==card._id){
                            return item;
                        }
                    })
                }
            })
        })
        .catch(res =>{
            console.log(res);
        }) 
    }

    handleAddCard(name, link){
        api.postCards(name,link).then(res =>{
            this.setState(state =>{
                return{
                    cards: [res, ...state.cards]
                }
            })
            this.closePopup('isAddPlacePopupOpen');
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

                <AddPlacePopup 
                    onAddPlace ={this.handleAddCard.bind(this)} 
                    onClose = {() => this.closePopup('isAddPlacePopupOpen')} 
                    isOpen = {this.state.isAddPlacePopupOpen}/>

                <EditProfilePopup 
                    onClose = {() => this.closePopup('isEditProfilePopupOpen')} 
                    isOpen = {this.state.isEditProfilePopupOpen} 
                    onUpdateUser ={this.handleUpdateUser.bind(this)}/>

                <EditAvatarPopup 
                    onUpdateAvatar = {this.handleUpdateAvatar.bind(this)} 
                    onClose = {() => this.closePopup('isEditAvatarPopupOpen')} 
                    isOpen = {this.state.isEditAvatarPopupOpen}/> 

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
