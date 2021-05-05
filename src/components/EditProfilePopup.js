import React, { useState } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

export default function PopupWithForm(props){
    const currentUser = React.useContext(currentUserContext);
    const [name, setName] = useState(currentUser.name)
    const [description, setDescription] = useState(currentUser.about);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 
    function onChangeName(e){
        setName(e.target.value);
    }
    function onChangeDescription(e){
        setDescription(e.target.value);
    }

    function onSubmit(e){
        e.preventDefault();
        props.onUpdateUser(name, description);
        props.onClose();
    } 
    return(
        <section className={`modal-window modal-window_edit ${props.isOpen ? 'modal-window_is-open' : ''}`} onClick={props.onClose}>
            <form onSubmit ={onSubmit} name="edit" className={`modal-window__form`} onClick={(evt) => evt.stopPropagation()} noValidate>
                <h2 className="modal-window__title">Редактировать профиль</h2>
                <label>
                    <input onChange={onChangeName} name="name" placeholder = "Имя" className="modal-window__item modal-window__name" type="text" required minLength="2" maxLength="40"/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <label>
                    <input onChange={onChangeDescription} name="emloyment" placeholder = "Род деятельности" className="modal-window__item modal-window__employment" type="text" minLength="2" maxLength="200" required/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <button className={`modal-window__item modal-window__submit-button`} type="submit">Сохранить</button>
                <button type="button" className={`modal-window__close-button`} onClick={props.onClose}></button>
            </form>
        </section>);
}