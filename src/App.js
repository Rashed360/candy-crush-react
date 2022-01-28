import { useEffect, useState } from "react"

const width = 8
const imgSize = 70
const boardSize = width*imgSize
const candyColors = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'purple',
]

const App = () => {
  const [currentColorArrangement, setcurrentColorArrangement] = useState([])

  const checkForColumnOfFour = () => {
    for (let i = 0; i < (width*width-3)-1; i++) {
      const columnOfFour = [i, i+width, i+width*2, i+width*3]
      const decidedColor = currentColorArrangement[i]

      if (columnOfFour.every(color => currentColorArrangement[color] === decidedColor)) {
        columnOfFour.forEach(color => currentColorArrangement[color] = '')
      }

    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i < (width*width-2)-1; i++) {
      const columnOfThree = [i, i+width, i+width*2]
      const decidedColor = currentColorArrangement[i]

      if (columnOfThree.every(color => currentColorArrangement[color] === decidedColor)) {
        columnOfThree.forEach(color => currentColorArrangement[color] = '')
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

      if (rowOfFour.every(color => currentColorArrangement[color] === decidedColor)) {
        rowOfFour.forEach(color => currentColorArrangement[color] = '')
      }

    }
  }

  const checkForRowOfThree = () => {
    let twoLast = width-2
    let oneLast = width-1
    for (let i = 0; i < (width*width)-1; i++) {
      const rowOfThree = [i, i+1, i+2]
      const decidedColor = currentColorArrangement[i]
      
      if (i=== twoLast) {
        twoLast+=width
        continue
      }
      if (i === oneLast) {
        oneLast+=width
        continue
      }

      if (rowOfThree.every(color => currentColorArrangement[color] === decidedColor)) {
        rowOfThree.forEach(color => currentColorArrangement[color] = '')
      }

    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < width*width-width; i++) {
      
      if(currentColorArrangement[i + width] === '') {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = ''
      }

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

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForRowOfFour()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setcurrentColorArrangement([...currentColorArrangement])
    }, 500)
    return () => clearInterval(timer)
  },
  [ checkForColumnOfFour, 
    checkForColumnOfThree, 
    checkForRowOfFour, 
    checkForRowOfThree, 
    moveIntoSquareBelow, 
    currentColorArrangement
  ])
  
  console.log(currentColorArrangement)
  

  return (
    <div className="app">
      <div className="game" style={{height:boardSize,width:boardSize}}>
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            width={imgSize+"px"} 
            height={imgSize+"px"} 
            key={index} 
            src={"/img/"+(candyColor ? candyColor : "_")+".png"} 
            alt={candyColor} />
        ))}
      </div>
    </div>
  )
}

export default App
