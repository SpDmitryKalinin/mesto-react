export default function Card({card, onCardClick}){
    if(!card){
        return null
    }   
    else{
        return(
            <section className="element" key = {card._id}>
                <img className="element__image" src={card.link} alt={card.name} onClick ={() => onCardClick(card)}/>
                <div className="element__caption">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__like">
                        <button type="button" className="element__button-like"></button>
                        <p className="element__counter-like">{card.likes.length}</p>
                    </div>
                </div>
                <button className="element__button-delete"></button>
            </section>
        )
    }
}