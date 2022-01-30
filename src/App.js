import { useEffect, useState } from "react"
import red from './img/red.png'
import green from './img/green.png'
import blue from './img/blue.png'
import yellow from './img/yellow.png'
import orange from './img/orange.png'
import purple from './img/purple.png'
import blank from './img/blank.png'
import ScoreBoard from "./components/ScoreBoard"

const width = 8
const imgSize = 70
const boardSize = width*imgSize
const candyColors = [
  red,
  green,
  blue,
  yellow,
  orange,
  purple,
]

const App = () => {
  const [currentColorArrangement, setcurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [currentScore, setCurrentScore] = useState(85)

  const checkForColumnOfFour = () => {
    for (let i = 0; i < (width*width-3)-1; i++) {
      const columnOfFour = [i, i+width, i+width*2, i+width*3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfFour.every(color => currentColorArrangement[color] === decidedColor && !isBlank)) {
        setCurrentScore(currentScore => currentScore+4)
        columnOfFour.forEach(color => currentColorArrangement[color] = blank)
        return true
      }

    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i < (width*width-2)-1; i++) {
      const columnOfThree = [i, i+width, i+width*2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfThree.every(color => currentColorArrangement[color] === decidedColor && !isBlank)) {
        setCurrentScore(currentScore => currentScore+3)
        columnOfThree.forEach(color => currentColorArrangement[color] = blank)
        return true
      }

    }
  }

  const checkForRowOfFour = () => {
    let threeLast = width-3
    let twoLast = width-2
    let oneLast = width-1
    for (let i = 0; i < (width*width)-1; i++) {
      const rowOfFour = [i, i+1, i+2, i+3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank
      
      if (i=== threeLast) {
        threeLast+=width
        continue
      }
      if (i=== twoLast) {
        twoLast+=width
        continue
      }
      if (i === oneLast) {
        oneLast+=width
        continue
      }

      if (rowOfFour.every(color => currentColorArrangement[color] === decidedColor && !isBlank)) {
        setCurrentScore(currentScore => currentScore+4)
        rowOfFour.forEach(color => currentColorArrangement[color] = blank)
        return true
      }

    }
  }

  const checkForRowOfThree = () => {
    let twoLast = width-2
    let oneLast = width-1
    for (let i = 0; i < (width*width)-1; i++) {
      const rowOfThree = [i, i+1, i+2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank
      
      if (i=== twoLast) {
        twoLast+=width
        continue
      }
      if (i === oneLast) {
        oneLast+=width
        continue
      }

      if (rowOfThree.every(color => currentColorArrangement[color] === decidedColor && !isBlank)) {
        setCurrentScore(currentScore => currentScore+3)
        rowOfThree.forEach(color => currentColorArrangement[color] = blank)
        return true
      }

    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < width*width-width; i++) {

      if (i < width && currentColorArrangement[i]===blank) {
        const randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }
      
      if(currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }

    }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
    setcurrentColorArrangement([...currentColorArrangement])

    const validMoves = [ 
      squareBeingDraggedId-1, 
      squareBeingDraggedId+1, 
      squareBeingDraggedId-width,
      squareBeingDraggedId+width
    ]
    const validMove = validMoves.includes(squareBeingReplacedId)
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId && validMove && 
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
      } else {
        currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
        setcurrentColorArrangement([...currentColorArrangement])
      }
  }

  const createBoard = () => {
    const randomColorArangement = []
    for (let i = 0; i < width*width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArangement.push(randomColor)
    }    
    setcurrentColorArrangement(randomColorArangement)
  }

  const playerWin = () => {
    if (currentScore > 99) {
      setCurrentScore(0)
      console.log('You Win')
      createBoard()
    }
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    playerWin()
  }, [playerWin])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForRowOfFour()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setcurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  },
  [ checkForColumnOfFour, 
    checkForColumnOfThree, 
    checkForRowOfFour, 
    checkForRowOfThree, 
    moveIntoSquareBelow,
    currentColorArrangement
  ])
  

  return (
    <div className="app">
      <div className="game" style={{height:boardSize,width:boardSize}}>
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index} 
            style={{width:imgSize+"px",height:imgSize+"px"}}
            src={candyColor} 
            data-id={index}             
            draggable={true}
            onDragStart={dragStart}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      <ScoreBoard score={currentScore} width={boardSize} />
      </div>
    </div>
  )
}

export default App
