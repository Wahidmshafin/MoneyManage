
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function CardMonth(prop){
    return (
        <div onClick={prop.onClick} className="card" style={{ width: '15rem' }}>
        <img className="card-img-top" src="/jan.jpg" style={{opacity: 0.5}} alt="Card image cap"></img>
        <div className="image-overlay position-absolute" style={{fontSize:"32px", color: 'white',  left:"50%", transform:"translate(-50%)",  background: 'rgba(0, 0, 0, 0.5)', marginTop:"50px", padding: '5px 10px', borderRadius: '5px' }}>
                {prop.month}
            </div>
        <div className="card-body">
            <h5 className="card-title"> <CalendarTodayIcon fontSize='small' /> {prop.month}</h5>
            <div className="card-text" style={{color:"green", fontWeight:"bold"}}> Total Income: </div>
            <div className="card-text"> ${prop.income} </div>
            <div className="card-text" style={{color:"red", fontWeight:"bold"}}> Total Expense: </div>
            <div className="card-text"> ${prop.expense} </div>
            <div className="card-text" style={{color:"blue", fontWeight:"bold"}}> Saved:  </div>
            <div className="card-text"> ${prop.save} </div>
        </div>
        </div>
    );
}

export default CardMonth;
