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

  const checkForColumnOfThree = () => {
    for (let i = 0; i < (width*width-2)-1; i++) {
      const columnOfThree = [i, i+width, i+width*2]
      const decidedColor = currentColorArrangement[i]

      if (columnOfThree.every(color => currentColorArrangement[color] === decidedColor)) {
        columnOfThree.forEach(color => currentColorArrangement[color] = '_')
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
      checkForColumnOfThree()
      setcurrentColorArrangement([...currentColorArrangement])
    }, 500)
    return () => clearInterval(timer)
  }, [checkForColumnOfThree, currentColorArrangement])
  
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
