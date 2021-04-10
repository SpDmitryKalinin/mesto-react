import React from 'react';
import apiClass from '../utils/Api';
import Card from './Card.js';

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: "Жак ив Кусто",
            userDescription: "Исследователь",
            userAvatar: "",
            cards: []
        }
    }
    render(){
        return (<main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <button className="profile__avatar-edit-button" onClick={this.props.onEditAvatar}></button>
                    <img className="profile__avatar" src={this.state.userAvatar} alt="Аватар"/>
                </div>
                <div className="profile__info">
                    <div className="profile__item">
                        <h1 className="profile__title">{this.state.userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={this.props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{this.state.userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={this.props.onAddPlace}></button>
            </section>
            <section className="elements">
                {
                    this.state.cards.map((item => {
                        return <Card onCardClick ={this.props.onCardClick} card={item} key = {item.id}/>
                    }))
                }
                
            </section>
        </main>);
    }
    componentDidMount(){
        apiClass.getProfileInfo().then(res=>{
            this.setState(
                {userName: res.name,
                userDescription: res.about,
                userAvatar: res.avatar});
        })
        apiClass.getCards().then(res =>{
            this.setState({cards: res});
        })
        
    }
}

