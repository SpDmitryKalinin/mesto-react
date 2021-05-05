import React from 'react';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}){
    const linkRef = React.useRef();
    const nameRef = React.useRef();
    return(
        <section className={`modal-window modal-window_add ${isOpen ? 'modal-window_is-open' : ''}`} onClick={onClose}>
            <form onSubmit = {handleSubmit} name="add" className={`modal-window__form`} onClick={(evt) => evt.stopPropagation()} noValidate>
                <h2 className="modal-window__title">Новое место</h2>
                <label>
                    <input ref={nameRef} name="place" placeholder = "Название" className="modal-window__item modal-window__place" type="text" required minLength="2" maxLength="30"/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <label>
                    <input ref={linkRef} type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <button className={`modal-window__item modal-window__submit-button`} type="submit">Сохранить</button>
                <button type="button" className={`modal-window__close-button`} onClick={onClose}></button>
            </form>
        </section>);
    function handleSubmit(e){
        e.preventDefault();
        onAddPlace(nameRef.current.value, linkRef.current.value);
        onClose();
    }
}