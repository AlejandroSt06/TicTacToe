function Header(props) {
    return (
        <header className="top-header">

            <div className="header-player">
                <span className="X">X</span>
                <h2 className="X">{props.xWins} wins</h2>
            </div>

            <div className="header-player">
                <span className="O">O</span>
                <h2 className="O">{props.oWins} wins</h2>
            </div>

            <div className="header-player">
                <span className="balance-icon">
                    <img src="/balance-icon.png"></img>
                </span>
                <h2 className="balance-h2">{props.draws} draws</h2>
            </div>
        </header>


    )
}


export default Header
