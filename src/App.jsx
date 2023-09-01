import { PureComponent, useState } from 'react'
import Header from './Header'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import WinnerMessagePop from './winnerMessage'
import Confetti from 'react-confetti'
import { Howl, Howler } from 'howler';


function App() {
  const player1 = "X"
  const player2 = "O"
  const computer = player2

  const [board, setBoard] = useState(new Array(9).fill())
  const [currentPlayer, setCurrentPlayer] = useState(player1)
  const [winner, setWinner] = useState(null)
  const [singlePlayer, setMod] = useState(true)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false);

  const [isSound,setSound] = useState(true)

  const [confettiConfig, setConfettiConfig] = useState({
    angle: 90,
    spread: 360,
    startVelocity: 100,
    elementCount: 100,
    dragFriction: 0.12,
    duration: 1000,
    delay: 0,
    colors: ['#FF0000', '#00FF00', '#0000FF'],
    opacity: 1,

    onComplete: () => setShowConfetti(false),
  });
  const [points, setPoints] = useState({
    "X": 0,
    "O": 0,
    draws: 0

  })
  const [handleCount, setHandleCount] = useState(0)
  function handleClick(index) {

    const newBoard = [...board]

    if (!board[index] && !winner) {

      newBoard[index] = currentPlayer;


      if (checkWinner(newBoard, currentPlayer)) {

        setShowConfetti(true);
        setPoints((prevPoints) => ({
          ...prevPoints,
          [currentPlayer]: prevPoints[currentPlayer] + 1
        }));

        setWinner(currentPlayer)
        
       playSound(playVictorySound)
      }



      console.log(currentPlayer, "player2")
      if (singlePlayer && handleCount < 4) {

        computerMove(newBoard)

      }
      setBoard(newBoard)

      console.log(currentPlayer)

      newBoard.every((cell) => cell) && (

        setPoints((prevPoints) => ({
          ...prevPoints,
          draws: prevPoints.draws + 1
        })))
      newBoard.every((cell) => cell) && (

        setWinner("Draw!")
      )

      !singlePlayer && setCurrentPlayer(currentPlayer === player1 ? player2 : player1)

      setHandleCount(handleCount + 1)
      console.log("count", handleCount)
    }

playSound(playPopSound)
  }

  function computerMove(newBoard) {

    if (!winner) {
      var numCas = Math.floor(Math.random() * 9)
      if (newBoard[numCas]) {

        while (newBoard[numCas]) {
          numCas = Math.floor(Math.random() * 9)
        }
        console.log(numCas, "changed")
      }
      console.log(numCas)

      newBoard[numCas] = computer;


      if (checkWinner(newBoard, currentPlayer)) {

        setShowConfetti(true);
        setPoints((prevPoints) => ({
          ...prevPoints,
          [currentPlayer]: prevPoints[currentPlayer] + 1
        }));

        setWinner(currentPlayer)
        //console.log(points)
      }

    }

  }




  //controllo del vincitore
  function checkWinner(currentBoard, player) {

    const WinCombo = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], //linee orizzontali
      [0, 3, 6], [1, 4, 7], [2, 5, 8], //linee verticali
      [0, 4, 8], [2, 4, 6]
    ]

    for (var combo of WinCombo) {

      var [a, b, c] = combo
      if (currentBoard[a] === player && currentBoard[b] === player && currentBoard[c] === player) {

        return true
      }
    }
    return false;
  }




  var playerCell = " "

  function renderCell(cell, index) {
    playerCell = cell === player1 ? "X" : "O";
    return <button
      key={index + 1}
      className={`${playerCell} cell`}
      onClick={() => handleClick(index)}

    >
      {board[index]}
    </button>

  }
  function restart() {
    setBoard(new Array(9).fill())
    setWinner(null);
    setShowConfetti(false)
    setHandleCount(0)
    setCurrentPlayer(player1)
    playSound(playInterfaceSound)
  }

  function changeMod() {

    restart()
    setMod(!singlePlayer)
    if(isSound){
      playInterfaceSound()
    }

  }

  function playSound(playFunction){


  if(isSound){
    playFunction()
  }
  }
function changeSoundState(){
  setSound(!isSound)
  
}

  function playPopSound() {
    const sound = new Howl({
      src: ['/pop.mp3'], // Sostituisci con il percorso reale del tuo file audio
    });
    sound.play();

  }
  
  function playVictorySound() {
    const sound = new Howl({
      src: ['/success.mp3'], // Sostituisci con il percorso reale del tuo file audio
    });
    sound.play();
  }
  function playInterfaceSound() {
    const sound = new Howl({
      src: ['/interface.mp3'], // Sostituisci con il percorso reale del tuo file audio
    });
    sound.play();
  }
  const currentModPlayers = singlePlayer ? "1 Player" : "2 Players";
  const classCurrentPlayer = currentPlayer === player1 ? "current-player player1-play" : "current-player player2-play"

  const soundIconClass = !isSound && "not-sound" 
  console.log(isSound)
  return (
    <>



      <div className='container'>
        <div className='confetti'>{showConfetti && <Confetti width={400} height={800} />}</div>
        <Header xWins={points.X} oWins={points.O} draws={points.draws} />
        <div className="board">

          {board.map((cell, index) => {
            return renderCell(cell, index)
          })}
        </div>
        {winner && <WinnerMessagePop winnerPlayer={winner} style={playerCell} />}
        <div className={classCurrentPlayer}>
          <div className={`current-back ${classCurrentPlayer}`}></div>

          <span>{player1}</span>
          <span>{player2}</span>
        </div>

        <div className='control-buttons'>
        <div className='ctrl-btn-container'>
          <button className="restart-btn" onClick={restart}>
            <img src={'/restart-icon.png'} alt="Restart" />
          </button>
</div>
          <button onClick={changeMod}>
            <span>{currentModPlayers}</span>
          </button>

<div className={`ctrl-btn-container ${soundIconClass}`}>

          <button className='restart-btn'  onClick={changeSoundState}>
          
            <img src="/Sound-icon.png" alt="Settings" />
          </button>
          <div></div>
          </div>
        </div>
      </div>


    </>
  )
        }
      
export default App
      

