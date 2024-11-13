

function Card(prop){
    return (
        <div className="card" style={{ width: '17rem' }}>
        <div className="card-body">
            <h5 className="card-title">{prop.title}</h5>
            <p className="card-text">{prop.detail}</p>
            <h5 className="my-3">${prop.amount}</h5>
        </div>
        </div>
    );
}

export default Card;
