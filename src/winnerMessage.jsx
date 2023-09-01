function WinnerMessagePop(props){
const winnerMessageBody = props.winnerPlayer !== "Draw!" && "wins" 
const classPopUp = props.winnerPlayer && "popup-show"
    return(
<>




    <div className={`popup ${classPopUp}`} id="popup">
        <div class="popup-content">
            <h2 className={props.style}>{props.winnerPlayer}</h2>
           <p className="win-ms-par">{winnerMessageBody}</p>
     
        </div>
    </div>

    <div className="overlay" id="overlay"></div>

</>

    )
}


export default WinnerMessagePop