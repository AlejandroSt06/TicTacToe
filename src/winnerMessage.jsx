function WinnerMessagePop(props){

    return(
<>

<div class="overlay" id="overlay"></div>


    <div class="popup" id="popup">

        <div class="popup-content">
            <h2 className={props.style}>{props.winnerPlayer}</h2>
            <p>Wins!</p>
     
        </div>
    </div>



</>

    )
}


export default WinnerMessagePop