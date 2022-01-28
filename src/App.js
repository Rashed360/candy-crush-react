import { useEffect, useState } from "react"

const width = 7
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
        columnOfFour.forEach(color => currentColorArrangement[color] = '_')
      }

    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i < (width*width-2)-1; i++) {
      const columnOfThree = [i, i+width, i+width*2]
      const decidedColor = currentColorArrangement[i]

      if (columnOfThree.every(color => currentColorArrangement[color] === decidedColor)) {
        columnOfThree.forEach(color => currentColorArrangement[color] = '_')
      }

    }
  }

  const checkForRowOfThree = () => {
    let twoLast = width-2
    let oneLast = width-1
    for (let i = 0; i < (width*width)-1; i++) {
      const eowOfThree = [i, i+1, i+2]
      const decidedColor = currentColorArrangement[i]
      
      if (i=== twoLast) {
        twoLast+=width
        continue
      }
      if (i === oneLast) {
        oneLast+=width
        continue
      }

      if (eowOfThree.every(color => currentColorArrangement[color] === decidedColor)) {
        eowOfThree.forEach(color => currentColorArrangement[color] = '_')
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
    const timer = setInterval(()=>{
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      setcurrentColorArrangement([...currentColorArrangement])
    }, 500)
    return () => clearInterval(timer)
  }, [ checkForColumnOfFour, checkForColumnOfThree, checkForRowOfThree, currentColorArrangement])
  
  console.log(currentColorArrangement)
  

  return (
    <div className="app">
      <div className="game" style={{height:boardSize,width:boardSize}}>
        {currentColorArrangement.map((candyColor, index) => (
          <img width={imgSize+'px'} height={imgSize+'px'} key={index} src={"/img/"+candyColor+".png"} alt={candyColor} />
        ))}
      </div>
    </div>
  )
}

export default App
