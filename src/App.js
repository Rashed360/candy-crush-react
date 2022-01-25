import { useEffect, useState } from "react"

const width = 8
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
  
  console.log(currentColorArrangement)
  

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img key={index} style={{backgroundColor:candyColor}}/>
        ))}
      </div>
    </div>
  )
}

export default App
