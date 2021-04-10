import React, { useState } from 'react';

export default class Card extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<section className="element" key = {this.props.id}>
                <img className="element__image" src={this.props.card.link} alt={this.props.card.name} onClick ={() => this.props.onCardClick(this.props.card)}/>
                <div className="element__caption">
                <h2 className="element__title">{this.props.card.name}</h2>
                <div className="element__like">
                    <button type="button" className="element__button-like"></button>
                    <p className="element__counter-like">{this.props.card.likes.lenght}</p>
                </div>
            </div>
            <button className="element__button-delete"></button>
        </section>)
    }
}