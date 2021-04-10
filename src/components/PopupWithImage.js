import React from 'react';

export default class PopupWithImage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <section className={this.props.card ? "modal-window modal-window_image modal-window_is-open" : "modal-window modal-window_image"} onClick={this.props.isClose}>
            <div className="modal-window__container-full-image" onClick={(evt) => evt.stopPropagation()}>
                <img className="modal-window__full-image" src={this.props.card.link} alt={this.props.card.name}/>
                <h2 className="modal-window__image-caption">{this.props.card.name}</h2>
                <button className="modal-window__close-button modal-window__close-button_image" onClick={this.props.isClose}></button>
            </div>
        </section>);
    }
}