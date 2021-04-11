export default function PopupWithForm({isOpen, name, title, children, onClose}){
    return(
        <section className={`modal-window modal-window_${name} ${isOpen}`} onClick={onClose}>
            <form name={name} className={`modal-window__form`} onClick={(evt) => evt.stopPropagation()} noValidate>
                <h2 className="modal-window__title">{title}</h2>
                {children}
                <button className={`modal-window__item modal-window__submit-button modal-window__submit-button_disabled`} type="submit" disabled>Сохранить</button>
                <button type="button" className={`modal-window__close-button`} onClick={onClose}></button>
            </form>
        </section>);
}