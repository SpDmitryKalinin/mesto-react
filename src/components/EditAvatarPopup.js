import React from 'react';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
    const inputRef = React.useRef();
    return(
        <section className={`modal-window modal-window_edit-avatar ${isOpen ? 'modal-window_is-open' : ''}`} onClick={onClose}>
            <form onSubmit={handleSubmit} name="edit-avatar" className={`modal-window__form`} onClick={(evt) => evt.stopPropagation()} noValidate>
                <h2 className="modal-window__title">Редактировать аватар</h2>
                <label>
                    <input ref={inputRef} type="url" name="link" placeholder="Ссылка на картинку" className="modal-window__item modal-window__link" required/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <button className={`modal-window__item modal-window__submit-button`} type="submit">Сохранить</button>
                <button type="button" className={`modal-window__close-button`} onClick={onClose}></button>
            </form>
        </section>);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(inputRef.current.value);
        onClose();
      } 
}