import React from 'react';

export default class PopupWithForm extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
        <section className={`modal-window modal-window_${this.props.name} ${this.props.isOpen}`} onClick={this.props.isClose}>
            <form name={this.props.name} className={`modal-window__form modal-window__form_${this.props.name}`} onClick={(evt) => evt.stopPropagation()} noValidate>
                <h2 className="modal-window__title">{this.props.title}</h2>
                {this.props.children}
                <button className={`modal-window__item modal-window__submit-button modal-window__submit-button_disabled modal-window__submit-button-${this.props.name}`} type="submit" disabled>Сохранить</button>
                <button type="button" className={`modal-window__close-button modal-window__close-button_${this.props.name}`} onClick={this.props.isClose}></button>
            </form>
        </section>);
    }
}